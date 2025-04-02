
// Date formatting function
export function formatDate(dateString: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    return `${date.getDate()}. ${date.toLocaleString("en-US", { month: "short" })}. ${date.getFullYear()}`;
};

export function createSlug(title: string): string {
    // Create a slug from the title
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

    return slug;
}
