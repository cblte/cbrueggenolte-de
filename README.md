# cbrueggenolte.de - version 2025

Here you find the source-code for my personal site built with [Astro](https://astro.build) -
an upgrade from my previous Python Flask and Hugo-based implementation.
I'm currently in the process of migrating and enhancing content from older versions of the site,
so check back regularly for updates.
The site showcases my work, projects, and thoughts with a clean, responsive design.
Feel free to explore what's available now at [cbrueggenolte.de](https://cbrueggenolte.de),
and watch as more content gets added over time!

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`         | Installs dependencies                            |
| `npm dev`             | Starts local dev server at `localhost:4321`      |
| `npm build`           | Build your production site to `./dist/`          |
| `npm preview`         | Preview your build locally, before deploying     |
| `npm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm astro -- --help` | Get help using the Astro CLI                     |

## Technologies Used

* [Astro](https://astro.build): A modern static site generator.
* [Tailwind CSS](https://tailwindcss.com): For styling.
* [TypeScript](https://www.typescriptlang.org/): For type-safe code.

## Key Files and Directories

* [`astro.config.mjs`](astro.config.mjs): Astro configuration file.
* [`src/content.config.ts`](src/content.config.ts): Content collections configuration.
* [`src/pages/`](src/pages/): Contains the source code for the site's pages.
* [`src/components/`](src/components/):  Reusable Astro components.
* [`src/layouts/`](src/layouts/): Page layouts.
* [`src/styles/tailwind.config.js`](src/styles/tailwind.config.js): Tailwind CSS configuration.
* [`src/utils/utils.ts`](src/utils/utils.ts): Utility functions, including `formatDate` and `createSlug`.
* [`new-post.ts`](new-post.ts): Script to create new blog posts.

## Content

The site includes the following content types:

* **Blog posts:** Located in [`src/content/posts/`](src/content/posts/).  Use the [`new-post.ts`](new-post.ts) script to create new posts.
* **Static pages:**  Such as "About", "Uses", "Bookmarks", and "Manual Of Me".  These are located in the [`src/pages/`](src/pages/) directory.
* **Microblog:**  Random thoughts saved in [`src/content/microblog.txt`](src/content/microblog.txt).
