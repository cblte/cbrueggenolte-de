#!/usr/bin/env node
// new-post.js
// version 25.4.3
// Create a new blog post in the posts directory
// Usage: node new-post.js <slug>

import { exec } from "child_process";
import { error } from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a new markdown blogpost with frontmatter in this years folder.
 * @param {string} title
 */
function createBlogPost(title, editor = null) {
  // Create the slug from the passed title
  let slug = title.toLowerCase().replace(/ /g, "-");
  slug = slug.replace(/[^a-z0-9-]/g, ""); // Remove all non-alphanumeric characters except hyphens
  slug = slug.replace(/--+/g, "-"); // Remove multiple hyphens
  slug = slug.replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  // Replace german special umlauts
  slug = slug.replace(/ä/g, "ae");
  slug = slug.replace(/ö/g, "oe");
  slug = slug.replace(/ü/g, "ue");
  slug = slug.replace(/ß/g, "ss");

  // Getting seconds
  const timestamp = Math.floor(Date.now() / 1000);
  // Get YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const year = new Date().getFullYear();

  // get the path for the current year and create it if it doesn't exist
  const dirPath = path.join("./src/content/posts", `${year}`);
  fs.mkdirSync(dirPath, { recursive: true });

  // create the frontmatter
  const frontmatter = `---
title: "${title}"
description: ""
pubDate: ${today}
modDate: ${today}
tags: []
---`;

  const filePath = path.join(dirPath, `${today}-${slug}.md`);
  // Create file if it does not exists.
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, frontmatter, (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log(`Created new post: ${filePath}`);
    console.log(`Title: ${title}`);
    console.log(`Slug: ${slug}`);
  } else {
    console.log(`Post already existing: ${filePath}`);
  }

  if (editor) {
    console.log(`Opening in ${editor}`);
    exec(`${editor} "${filePath}"`, (error) => {
      if (error) {
        console.error(`Failed to open with ${editor}: ${error.message}`);
      }
    });
  }
}

// Check if title was provided as command line argument
if (process.argv.length < 3) {
  console.error("Error: Please provide a title for the blog post");
  console.log(
    'Usage: node blog-post-creator.js "My Blog Post Title" [editor-command]'
  );
  console.log("Examples:");
  console.log('  node blog-post-creator.js "My Blog Post Title" code');
  console.log('  node blog-post-creator.js "My Blog Post Title" vim');
  console.log('  node blog-post-creator.js "My Blog Post Title" "sublime"');
  process.exit(1);
}

const title = process.argv[2];
// Get optional editor command
const editor = process.argv[3] || null;

// Finally, create the blog post
createBlogPost(title, editor);
