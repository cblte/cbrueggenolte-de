#!/usr/bin/env node
// new-post.js
// version 25.4.3
// Create a new blog post in the posts directory
// Usage: node new-post.js <slug>

import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import pc from "picocolors";

// Handling ctrl+c gracefully globally
process.on("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 until next time!");
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

/**
 * Creates a new markdown blogpost with frontmatter in this years folder.
 * @param {string} title
 */
interface BlogPostOptions {
  title: string;
  editor?: string | null;
}

async function createBlogPost(
  title: string,
  editor: string | null = null
): Promise<void> {
  // Get YYYY-MM-DD format
  const today: string = new Date().toISOString().split("T")[0];
  const year: number = new Date().getFullYear();

  // get the path for the current year and create it if it doesn't exist
  const dirPath: string = path.join("./src/content/posts", `${year}`);
  await fs.mkdir(dirPath, { recursive: true });

  // Create the slug from the passed title
  let slug: string = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except hyphens
    .replace(/--+/g, "-") // Remove multiple hyphens
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

  // create the frontmatter
  const frontmatter: string = `---
title: "${title}"
description: ""
pubDate: ${today}
modDate: ${today}
tags: []
---`;

  const filePath: string = path.join(dirPath, `${today}-${slug}.md`);
  // Create file if it does not exists.
  try {
    await fs.stat(filePath);
    console.log(pc.yellow(`? Post already exists: ${filePath}`));
  } catch (err: any) {
    if (err.code === "ENOENT") {
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

let title: string = "";
let editor: string = "";

// Check if title was provided as command line argument

(async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Please provide a title for the blog post: ",
        required: true,
      },
      {
        name: "editor",
        type: "list",
        message: "Open in which editor?",
        choices: ["none", "code", "zed", "nano"],
        default: "none",
      },
    ]);
    const { title, editor } = answers;
    await createBlogPost(title, editor === "none" ? null : editor);
  } catch (error) {
    console.error(pc.red(error));
  }
})();
