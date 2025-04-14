// Date formatting function
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return `${date.getDate()}. ${date.toLocaleString("en-US", {
    month: "short",
  })}. ${date.getFullYear()}`;
}

export function createSlug(title: string): string {
  // Create a slug from the title
  const slug = title
    // Convert umlauts to their standard letters
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ä/g, "a")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  return slug;
}

interface Frontmatter {
  cover: string;
  coverDescription?: string;
}

export function getCoverImage(frontmatter: Frontmatter): string {
  if (!frontmatter.cover) {
    return ""; // or return a default image if desired
  }

  const altText = frontmatter.coverDescription || "Image cover"; // Default alt text
  return `<img src="${frontmatter.cover}" alt="${altText}" title="${altText}" />`;
}
