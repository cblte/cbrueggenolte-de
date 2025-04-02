import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { createSlug } from "@utils/utils.ts";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "Carstens Blog",
    description:
      "Stay updated with Carsten's personal website, where technology, creativity, and curiosity converge.Explore a collection of thoughts, notes, and projects that inspire and inform.Join the journey of discovery and share in the digital garden of ideas!",
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${createSlug(post.data.title)}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
