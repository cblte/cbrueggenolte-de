---
title: "Beautiful Admonitions in Astro – 6 Types + Custom Titles"
description: "Add clean, professional tip, warning, danger, note, info, and caution blocks to your Astro blog with a soft stone theme and optional custom titles."
pubDate: 2025-11-14
modDate: 2025-11-14
tags: ["Blog", "Astro", "Theming", "CSS"]
draft: false
---

Add **clean, professional, and accessible** admonition blocks to your Astro site
— perfect for documentation, tutorials, or blog posts.

This guide gives you:

- **6 types**: `tip`, `warning`, `danger`, `note`, `info`, `caution`
- **Custom titles** via `[Your Title]` syntax
- **Soft stone-themed colors** (pale, desaturated, readable)
- **Zero JavaScript**, fully static
- **No icons**, minimal & elegant

---

## Step 1: Install Required Package

```bash
npm install remark-directive
```

---

## Step 2: Create the Remark Plugin

Create `remark-admonition.js` in your project root:

```js
import { visit } from 'unist-util-visit';

/** Admonition Plugin – compatible with Astro + ESM + remark-directive */
function remarkAdmonitionCompatible() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        ['tip', 'warning', 'danger', 'note', 'info', 'caution'].includes(node.name)
      ) {
        const data = node.data || (node.data = {});
        const type = node.name;
        const titleText = type.charAt(0).toUpperCase() + type.slice(1);

        // Main element: <div class="admonition admonition-tip">
        data.hName = 'div';
        data.hProperties = {
          className: [`admonition`, `admonition-${type}`],
        };

        // Check if the first child is a paragraph (often contains the title)
        const firstChild = node.children[0];
        let titleContent = [];

        if (firstChild?.type === 'paragraph') {
          const textContent = firstChild.children
            .filter((child) => child.type === 'text')
            .map((child) => child.value)
            .join('')
            .trim();

          if (textContent && !textContent.includes('\n')) {
            titleContent = firstChild.children;
            // Remove the first paragraph, as it is now the title
            node.children.shift();
          }
        }

        // If no title from content → default title
        if (titleContent.length === 0) {
          titleContent = [{ type: 'text', value: titleText }];
        }

        // Create title element: <p class="admonition-title">TIP</p>
        const titleNode = {
          type: 'paragraph',
          data: {
            hName: 'p',
            hProperties: {
              className: 'admonition-title',
            },
          },
          children: titleContent,
        };

        // Insert title at the front
        node.children.unshift(titleNode);
      }
    });
  };
}
```

---

## Step 3: Update `astro.config.mjs`

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkAdmonitionCompatible from './remark-admonition.js';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkAdmonitionCompatible,
    ],
  },
});
```

---

## Step 4: Add Global Styles

Either add the styles to your `global.css` file
or create `src/styles/admonitions.css` and import it into your layout.

```css
/* src/styles/admonitions.css */
.admonition {
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  border-left: 4px solid;
  border-radius: 0.375rem;
  background-color: var(--color-stone-50);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.admonition > :first-child {
  margin-top: 0;
}

.admonition > :last-child {
  margin-bottom: 0;
}

.admonition p {
  margin: 0.5rem 0;
  color: var(--color-stone-700);
}

.admonition p:first-of-type {
  margin-top: 0;
}

.admonition p:last-of-type {
  margin-bottom: 0;
}

/* Title */
.admonition-title {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-stone-800);
}

/* Tip – Green */
.admonition-tip {
  background-color: var(--color-green-100);
  border-color: var(--color-green-300);
  color: var(--color-green-800);
}

/* Warning – Yellow */
.admonition-warning {
  background-color: var(--color-yellow-100);
  border-color: var(--color-yellow-300);
  color: var(--color-yellow-800);
}

/* Danger – Red */
.admonition-danger {
  background-color: var(--color-red-100);
  border-color: var(--color-red-300);
  color: var(--color-red-800);
}

/* Note – Blue */
.admonition-note {
  background-color: var(--color-blue-100);
  border-color: var(--color-blue-300);
  color: var(--color-blue-800);
}

/* Info – Cyan */
.admonition-info {
  background-color: var(--color-cyan-100);
  border-color: var(--color-cyan-300);
  color: var(--color-cyan-800);
}

/* Caution – Orange */
.admonition-caution {
  background-color: var(--color-orange-100);
  border-color: var(--color-orange-300);
  color: var(--color-orange-800);
}
```

> **Import in your layout:**

```astro
---
// src/layouts/BlogPost.astro
import '../styles/admonitions.css';
---
```

---

## Step 5: Define Color Variables (Optional but Recommended)

If you are not using Tailwind.css as I am, add these color variables to your global CSS or `:root`:

```css
:root {
  /* Stone */
  --color-stone-50: #fafaf9;
  --color-stone-700: #44403c;
  --color-stone-800: #292524;

  /* Green */
  --color-green-100: #f0fdf4;
  --color-green-300: #86efac;
  --color-green-800: #166534;

  /* Yellow */
  --color-yellow-100: #fefce8;
  --color-yellow-300: #fde047;
  --color-yellow-800: #9a3412;

  /* Red */
  --color-red-100: #fef2f2;
  --color-red-300: #fca5a5;
  --color-red-800: #991b1b;

  /* Blue */
  --color-blue-100: #eff6ff;
  --color-blue-300: #93c5fd;
  --color-blue-800: #1e40af;

  /* Cyan */
  --color-cyan-100: #ecfeff;
  --color-cyan-300: #67e8f9;
  --color-cyan-800: #0e7490;

  /* Orange */
  --color-orange-100: #fff7ed;
  --color-orange-300: #fdba74;
  --color-orange-800: #9c4221;
}
```

---

## Example Usage in Markdown

```md
:::tip[Pro Tip]
Use `Cmd + K` to open the command palette.
:::

:::warning
Never commit your `.env` file.
:::

:::danger
This action **cannot be undone**.
:::

:::note
Astro compiles to static HTML by default.
:::

:::info[Did You Know?]
You can use `.astro` files inside Markdown with MDX.
:::

:::caution
This feature is experimental — test thoroughly.
:::
```

---

### Result

:::tip[Pro Tip]
Use `Cmd + K` to open the command palette.
:::

:::warning
Never commit your `.env` file.
:::

:::danger
This action **cannot be undone**.
:::

:::note
Astro compiles to static HTML by default.
:::

:::info[Did You Know?]
You can use `.astro` files inside Markdown with MDX.
:::

:::caution
This feature is experimental — test thoroughly.
:::

---

## Done

You now have:

- **6 flexible admonition types**
- **Custom titles** with `[Title]` syntax
- **Clean, stone-themed design**
- **Full Astro + ESM compatibility**
- **Zero runtime overhead**

> **Pro tip**: Want `success` or `example` later? Just add the name to the array in the plugin and a CSS rule — done.

Clean. Simple. Powerful.
