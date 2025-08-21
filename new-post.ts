#!/usr/bin/env bun
// new-post.ts
// version 25.4.3
// Create a new blog post in the posts directory
// Usage: bun new-post.ts

import { exec } from 'child_process';
import fs from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path';
import pc from 'picocolors';

// Get YYYY-MM-DD format
const today: string = new Date().toISOString().split('T')[0];
const year: number = new Date().getFullYear();
const month: number = new Date().getMonth() + 1; // Months are zero-based in JavaScript

// Create the defaulTitle upfront
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // 'short' für abgekürzten Wochentag
    year: 'numeric',
    month: 'long', // 'short' für abgekürzten Monatsnamen
    day: '2-digit',
  };
  return new Intl.DateTimeFormat('de-DE', options).format(date);
};
const defaultTitle = formatDate(new Date()); // z.B. "Freitag, 6. Oktober 2023"

// Handling ctrl+c gracefully globally
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

// Define the interface for blog post options
interface BlogPostOptions {
  title: string;
  editor?: string | null;
}

async function createBlogPost(title: string, editor: string | null = null): Promise<void> {
  // get the path for the current year and create it if it doesn't exist
  const dirPath: string = path.join('./src/content/posts', `${year}`);
  await fs.mkdir(dirPath, { recursive: true });

  // Create the slug from the passed title
  const slug: string = germanSlugify(title);

  // create the frontmatter
  const frontmatter: string = `---
title: "${title}"
description: ""
pubDate: ${today}
modDate: ${today}
tags: []
draft: true
---`;

  const months: string = String(month).padStart(2, '0');
  const filePath: string = path.join(dirPath, `${year}-${months}`, `${today}-${slug}.md`);
  // make sure the directory for the file exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  // Create file if it does not exists.
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.stat(filePath);
    console.log(pc.yellow(`? Post already exists: ${filePath}`));
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, frontmatter);
      console.log(pc.green(`✔ Created new post: ${pc.cyan(filePath)}`));
      console.log(pc.green(`✔ Title:`), title);
      console.log(pc.green(`✔ Slug:`), slug);
    } else {
      throw err;
    }
  }

  if (editor) {
    console.log(pc.cyan(`Opening in ${editor}`));
    await new Promise<void>((resolve, reject) => {
      exec(`${editor} "${filePath}"`, (error) => {
        if (error) {
          reject(pc.red(`✘ Failed to open with ${editor}: ${error.message}`));
        } else {
          resolve();
        }
      });
    });
  }
} // end of function createBlogPost

// Function to slugify the title for German language
function germanSlugify(input: string): string {
  return input
    .normalize('NFC') // ensure composed characters (ä, ö, ü)
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-') // turn any run of non-alnum into hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

let title: string = '';
let editor: string = '';

// Main function to prompt user for input and create the blog post
(async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: `Please provide a title for the blog post\nor leave empty for today's date: `,
        required: true,
        default: defaultTitle,
      },
      {
        name: 'editor',
        type: 'list',
        message: 'Open in which editor?',
        choices: ['none', 'code', 'zed', 'nano'],
        default: 'none',
      },
    ]);
    const { title, editor } = answers;
    await createBlogPost(title, editor === 'none' ? null : editor);
  } catch (error) {
    console.error(pc.red(error));
  }
})();
