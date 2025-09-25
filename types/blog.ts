export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string; // Changed to string for SSR compatibility
  updatedAt: string; // Changed to string for SSR compatibility
  publishedAt?: string; // Keep as string for backward compatibility
  tags: string[];
  author?: string;
  featured: boolean;
  readingTime: number;
  language: "en" | "id";
  views?: number;
  likes?: number;
}

export interface BlogTag {
  name: string;
  slug?: string;
  count: number;
  description?: string;
}

export interface BlogMetadata {
  totalPosts: number;
  tags: BlogTag[];
  latestPosts: BlogPost[];
}
