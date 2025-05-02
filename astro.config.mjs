// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

/** Admonition Plugin (funktioniert mit Astro + ESM) */
function remarkAdmonitionCompatible() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && ['tip', 'warning', 'danger', 'note'].includes(node.name)) {
        const data = node.data || (node.data = {});
        const type = node.name;

        data.hName = 'div';
        data.hProperties = {
          class: `admonition admonition-${type}`,
        };

        if (node.children[0]?.type === 'paragraph') {
          const titleNode = {
            type: 'paragraph',
            data: {
              hName: 'p',
              hProperties: { class: 'admonition-title' },
            },
            children: [{ type: 'text', value: type.toUpperCase() }],
          };
          node.children.unshift(titleNode);
        }
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
      [remarkToc, { heading: 'Inhaltsverzeichnis', maxDepth: 3 }],
    ],
  },

  trailingSlash: 'always',
  site: 'https://cbrueggenolte.de',
  integrations: [sitemap()],
});
