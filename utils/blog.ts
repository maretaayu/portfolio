import { BlogPost, BlogTag } from "../types/blog";

// Utility functions for blog posts
// Static data removed - now using Firebase

// Deprecated functions - use Firebase instead
// These are kept for backward compatibility during migration
export function getAllPosts(): BlogPost[] {
  console.warn('getAllPosts from utils/blog.ts is deprecated. Use serverBlogService instead.');
  return [];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  console.warn('getPostBySlug from utils/blog.ts is deprecated. Use serverBlogService instead.');
  return undefined;
}

export function getPostsByTag(tag: string): BlogPost[] {
  console.warn('getPostsByTag from utils/blog.ts is deprecated. Use serverBlogService instead.');
  return [];
}

export function getAllTags(): BlogTag[] {
  console.warn('getAllTags from utils/blog.ts is deprecated. Use serverBlogService instead.');
  return [];
}

// Utility functions - still useful
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}