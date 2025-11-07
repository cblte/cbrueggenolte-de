#!/usr/bin/env node
/**
 * Generate exactly 4 tags per markdown post via a local LLM (LM Studio) and patch frontmatter.
 * Rule: Preserve first existing tag (if any) as #1, then ask model for 3 additional concise tags.
 * If no existing tags: ask for 4 tags. All tags TitleCase per hyphen segment.
 * Avoid duplicates and overlong (>30 chars) tokens; fallback to heuristic if model fails.
 *
 * Requirements:
 * - LM Studio running with OpenAI-compatible endpoint (default: http://localhost:1234/v1)
 * - Set env LMSTUDIO_MODEL (e.g. "lmstudio-community/gemma-2-9b-it") or pass --model
 * - Dry run: use --dry to preview changes only.
 *
 * Usage:
 *   node scripts/generate-tags-llm.js            # live update
 *   node scripts/generate-tags-llm.js --dry      # no file writes
 *   node scripts/generate-tags-llm.js --model my-model-name
 */
import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import readline from 'readline';

const ROOT = path.resolve(process.cwd());
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const API_URL = process.env.LMSTUDIO_API_URL || 'http://localhost:1234/v1/chat/completions';
const DEFAULT_MODEL = process.env.LMSTUDIO_MODEL || 'local-model';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry');
const modelArgIndex = args.indexOf('--model');
const MODEL = modelArgIndex !== -1 ? args[modelArgIndex + 1] : DEFAULT_MODEL;

function log(...m) {
  console.log('[tags-llm]', ...m);
}

function titleCaseTag(tag) {
  if (!tag) return tag;
  return tag
    .split('-')
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('-');
}

function extractFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) return null;
  const fm = content.slice(0, endIdx + 4);
  const body = content.slice(endIdx + 4);
  return { fm, body };
}

function getExistingTags(fm) {
  const m = fm.match(/\ntags:\s*\[([^\]]*)\]\s*\n/);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^"|"$/g, '').replace(/^'|'$/g, ''));
}

function replaceTags(fm, tags) {
  const line = `tags: [${tags.join(', ')}]\n`;
  if (/\ntags:\s*\[[^\]]*\]\s*\n/.test(fm)) {
    return fm.replace(/\ntags:\s*\[[^\]]*\]\s*\n/, `\n${line}`);
  }
  // insert after title if possible
  if (/\ntitle:\s*/.test(fm)) {
    return fm.replace(/(\ntitle:[^\n]*\n)/, `$1${line}`);
  }
  return fm.replace(/\n---\s*$/, `\n${line}---`);
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(p);
    } else if (e.isFile() && p.endsWith('.md')) {
      yield p;
    }
  }
}

async function callLLM(prompt) {
  const payload = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: 'You are a concise tagging engine. Return ONLY a JSON array of exactly the required tags.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
    max_tokens: 200,
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('No content');
    // Attempt to parse JSON array
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array in response: ' + text);
    const arr = JSON.parse(jsonMatch[0]);
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    log('LLM call failed:', err.message);
    return [];
  }
}

function buildPrompt({ title, body, existingFirst }) {
  const truncated = body.split('\n').slice(0, 120).join('\n'); // limit content for speed
  const want = existingFirst ? 3 : 4;
  return `Title: ${title}\nExisting first tag: ${
    existingFirst || '(none)'
  }\nTask: Suggest ${want} additional descriptive, short (1-2 words, may use single hyphen) tags in German or English that capture key topics, technologies, domains, or themes. Do not repeat the existing first tag. Avoid duplicates, generic words (blog, post, update, heute), months, common stopwords. Output ONLY a JSON array of ${
    existingFirst ? '["Tag2","Tag3","Tag4"]' : '["Tag1","Tag2","Tag3","Tag4"]'
  } with exactly ${existingFirst ? 3 : 4} items.\nContent:\n${truncated}`;
}

function sanitizeTags(tags, existingFirst) {
  const out = [];
  const seen = new Set();
  if (existingFirst) {
    const first = titleCaseTag(existingFirst);
    seen.add(first.toLowerCase());
    out.push(first);
  }
  for (const t of tags) {
    if (typeof t !== 'string') continue;
    let cleaned = t.trim().replace(/["'`]/g, '');
    cleaned = cleaned.toLowerCase();
    if (!cleaned) continue;
    if (seen.has(cleaned)) continue;
    // remove spaces -> turn to hyphen for multi-word
    cleaned = cleaned.replace(/\s+/g, '-');
    // basic filters
    if (cleaned.length < 3 || cleaned.length > 30) continue;
    if (/^(blog|post|update|links?|journal|fundstuecke|fundstücke|privates|tag|tags)$/i.test(cleaned)) continue;
    out.push(titleCaseTag(cleaned));
    seen.add(cleaned);
    if (out.length === 4) break;
  }
  // fallback if not enough
  const FALLBACKS = ['Alltag', 'Tech', 'Web', 'Notizen'];
  for (const fb of FALLBACKS) {
    if (out.length === 4) break;
    const key = fb.toLowerCase();
    if (!seen.has(key)) {
      out.push(fb);
      seen.add(key);
    }
  }
  return out.slice(0, 4);
}

async function processFile(file) {
  const raw = await fs.readFile(file, 'utf8');
  const fmParts = extractFrontmatter(raw);
  if (!fmParts) return null;
  const { fm, body } = fmParts;
  const titleMatch = fm.match(/\ntitle:\s*("([^"]+)"|'([^']+)'|([^\n]+))\n/);
  const title = titleMatch ? (titleMatch[2] || titleMatch[3] || titleMatch[4]).trim() : path.basename(file);
  const existing = getExistingTags(fm);
  const existingFirst = existing[0];
  const prompt = buildPrompt({ title, body, existingFirst });
  const llmTags = await callLLM(prompt);
  const finalTags = sanitizeTags(llmTags, existingFirst);
  const old = existing.map((t) => t.trim());
  // If existing already equals finalTags skip
  const same = old.length === finalTags.length && old.every((t, i) => t === finalTags[i]);
  if (same) return null;
  const newFm = replaceTags(fm, finalTags);
  const updated = newFm + body;
  if (!DRY_RUN) {
    await fs.writeFile(file, updated, 'utf8');
  }
  return { file, from: old, to: finalTags, llmRaw: llmTags };
}

async function confirm(question) {
  if (DRY_RUN) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question + ' (y/N) ', (ans) => {
      rl.close();
      resolve(/^y(es)?$/i.test(ans));
    })
  );
}

(async function main() {
  log('Starting tag generation via LM Studio');
  log('API:', API_URL, 'Model:', MODEL, DRY_RUN ? '(dry-run)' : '(live)');
  const proceed = await confirm('Proceed with updating all markdown posts?');
  if (!proceed) {
    log('Aborted by user.');
    process.exit(0);
  }
  const changes = [];
  for await (const file of walk(POSTS_DIR)) {
    const res = await processFile(file);
    if (res) {
      changes.push(res);
      log('Updated', path.relative(ROOT, file), '=>', `[${res.to.join(', ')}]`);
    }
  }
  log(`Done. ${changes.length} file(s) changed.`);
  if (DRY_RUN) {
    log('Dry-run summary:');
    for (const c of changes) {
      console.log('-', path.relative(ROOT, c.file));
      console.log('   old:', c.from);
      console.log('   new:', c.to);
      console.log('   llmRaw:', c.llmRaw);
    }
  }
})();
