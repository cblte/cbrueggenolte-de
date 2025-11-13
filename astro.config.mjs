// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';
import sitemap from '@astrojs/sitemap';

import remarkAdmonitionCompatible from './remark-admonitions';
/**
 * remarkSizeQuery
 * ----------------
 * A minimal custom Remark plugin that adds width, height,
 * and alignment classes to Markdown images via URL query syntax.
 *
 * Supported formats:
 *   ?400x300
 *   ?400x
 *   ?x300
 *   ?400x300-left
 *   ?400x300-right
 *   ?400x300-center
 */
function remarkSizeQuery() {
  return (tree) => {
    // Small helper to recursively walk through all nodes
    const visit = (node, fn) => {
      if (Array.isArray(node.children)) node.children.forEach((child) => visit(child, fn));
      fn(node);
    };

    visit(tree, (node) => {
      // Only act on Markdown image nodes
      if (node.type !== 'image' || typeof node.url !== 'string') return;

      // Pattern to detect optional width, height, and alignment
      // Examples it matches:
      //   ?480x270
      //   ?480x
      //   ?x270
      //   ?480x270-left / -right / -center
      const match = node.url.match(/\?(?<w>\d+)?x?(?<h>\d+)?(?:-(?<align>left|right|center))?$/);
      if (!match || !match.groups) return;

      const { w, h, align } = match.groups;

      // Strip query part from the final image URL (so browser loads clean path)
      node.url = node.url.replace(/\?(?:\d+)?x?(?:\d+)?(?:-(?:left|right|center))?$/, '');

      // Create metadata if not present
      node.data ||= {};
      node.data.hProperties ||= {};

      // Add width/height attributes
      if (w) node.data.hProperties.width = Number(w);
      if (h) node.data.hProperties.height = Number(h);

      // Add alignment CSS classes (Tailwind defaults)
      switch (align) {
        case 'left':
          node.data.hProperties.class = 'float-left mr-4 mb-2';
          break;
        case 'right':
          node.data.hProperties.class = 'float-right ml-4 mb-2';
          break;
        case 'center':
          node.data.hProperties.class = 'block mx-auto my-4';
          break;
        default:
          // no alignment → do nothing
          break;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.loca.lt', '.zrok.io'],
    },
  },
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkAdmonitionCompatible,
      remarkSizeQuery,
      [remarkToc, { heading: 'Inhaltsverzeichnis', maxDepth: 3 }],
    ],
    rehypePlugins: [],
  },

  trailingSlash: 'always',
  site: 'https://cbrueggenolte.de',
  integrations: [sitemap()],
});
