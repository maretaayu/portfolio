import { BlogPost } from "../types/blog";
import { generateSlug, calculateReadingTime } from "./blog";

interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
  language?: "en" | "id";
  author?: string;
}

export function createNewPost(data: CreatePostData): BlogPost {
  const slug = generateSlug(data.title);
  const readingTime = calculateReadingTime(data.content);
  const currentDate = new Date().toISOString().split("T")[0];

  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author || "Mareta",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    tags: data.tags || [],
    readingTime,
    featured: data.featured || false,
    language: data.language || "en",
  };
}

// Template for new posts
export const postTemplate = `# Your Post Title

Your post introduction goes here. This should be an engaging opening that draws readers in.

## Section Heading

Write your content here. You can use:

- Bullet points
- **Bold text**
- *Italic text*

## Another Section

### Subsection

1. Numbered lists
2. Are also supported
3. And look great

## Key Takeaways

Summarize the main points of your post here.

## Conclusion

Wrap up your thoughts and encourage engagement from readers.
`;

// Helper function to validate post data
export function validatePostData(data: CreatePostData): string[] {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!data.excerpt || data.excerpt.trim().length === 0) {
    errors.push("Excerpt is required");
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!data.tags || data.tags.length === 0) {
    errors.push("At least one tag is required");
  }

  if (data.title && data.title.length > 100) {
    errors.push("Title should be less than 100 characters");
  }

  if (data.excerpt && data.excerpt.length > 200) {
    errors.push("Excerpt should be less than 200 characters");
  }

  return errors;
}
