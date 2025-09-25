import { adminDb, isFirebaseAvailable } from "../lib/firebase-admin";
import { BlogPost, BlogTag } from "../types/blog";
import { Timestamp } from "firebase-admin/firestore";

// Mock data for fallback mode
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js and TypeScript",
    slug: "getting-started-nextjs-typescript",
    excerpt: "A comprehensive guide to building modern web applications with Next.js and TypeScript.",
    content: "# Getting Started with Next.js and TypeScript\n\nNext.js is a powerful framework for building React applications...",
    author: "Mareta",
    language: "en",
    tags: ["nextjs", "typescript", "react"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-15T10:00:00Z",
    featured: true,
    readingTime: 8,
    views: 125,
    likes: 15
  },
  {
    id: "2", 
    title: "Building Responsive Layouts with Tailwind CSS",
    slug: "responsive-layouts-tailwind-css",
    excerpt: "Learn how to create beautiful, responsive layouts using Tailwind CSS utility classes.",
    content: "# Building Responsive Layouts with Tailwind CSS\n\nTailwind CSS provides a utility-first approach...",
    author: "Mareta",
    language: "en",
    tags: ["tailwind", "css", "responsive"],
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    publishedAt: "2024-01-10T10:00:00Z",
    featured: false,
    readingTime: 6,
    views: 89,
    likes: 12
  },
  {
    id: "3",
    title: "Understanding React Hooks in Depth",
    slug: "understanding-react-hooks",
    excerpt: "Deep dive into React Hooks and how they can improve your component logic.",
    content: "# Understanding React Hooks in Depth\n\nReact Hooks revolutionized how we write components...",
    author: "Mareta",
    language: "en", 
    tags: ["react", "hooks", "javascript"],
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    publishedAt: "2024-01-05T10:00:00Z",
    featured: false,
    readingTime: 10,
    views: 203,
    likes: 28
  }
];

// Calculate reading time (average reading speed: 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Server-side blog service using Admin SDK with fallback
export const serverBlogService = {
  // Create new post (server-side)
  async createPost(
    postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - cannot create posts in fallback mode");
      throw new Error("Firebase not available for creating posts");
    }

    try {
      const now = Timestamp.now();
      const docRef = await adminDb.collection("posts").add({
        ...postData,
        createdAt: now,
        updatedAt: now,
        views: 0,
        likes: 0,
      });

      console.log("Post created with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post");
    }
  },

  // Get all posts (server-side)
  async getAllPosts(): Promise<BlogPost[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      return mockPosts;
    }

    try {
      const querySnapshot = await adminDb
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();

      return querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updatedAt:
            data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
          readingTime:
            data.readingTime || calculateReadingTime(data.content || ""),
        };
      }) as BlogPost[];
    } catch (error) {
      console.error("Error getting posts:", error);
      console.warn("Falling back to mock data");
      return mockPosts;
    }
  },

  // Get post by slug (server-side)
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      const mockPost = mockPosts.find(post => post.slug === slug);
      return mockPost || null;
    }

    try {
      const querySnapshot = await adminDb
        .collection("posts")
        .where("slug", "==", slug)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt:
          data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
        readingTime:
          data.readingTime || calculateReadingTime(data.content || ""),
      } as BlogPost;
    } catch (error) {
      console.error("Error getting post by slug:", error);
      console.warn("Falling back to mock data");
      const mockPost = mockPosts.find(post => post.slug === slug);
      return mockPost || null;
    }
  },

  // Update post (server-side)
  async updatePost(
    id: string,
    updates: Partial<BlogPost>
  ): Promise<void> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - cannot update posts in fallback mode");
      throw new Error("Firebase not available for updating posts");
    }

    try {
      await adminDb
        .collection("posts")
        .doc(id)
        .update({
          ...updates,
          updatedAt: Timestamp.now(),
        });

      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Failed to update post");
    }
  },

  // Delete post (server-side)
  async deletePost(id: string): Promise<void> {
    console.log(`🗑️ deletePost called with ID: ${id}`);
    console.log(`🔍 Firebase availability: ${isFirebaseAvailable}`);
    console.log(`🔍 adminDb exists: ${!!adminDb}`);
    
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("⚠️ Firebase not available - cannot delete posts in fallback mode");
      console.warn(`isFirebaseAvailable: ${isFirebaseAvailable}, adminDb: ${!!adminDb}`);
      throw new Error("Firebase not available for deleting posts");
    }

    try {
      console.log(`🔥 Attempting to delete document from collection 'posts' with ID: ${id}`);
      await adminDb.collection("posts").doc(id).delete();
      console.log(`✅ Post deleted successfully: ${id}`);
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        code: (error as any)?.code,
        details: (error as any)?.details
      });
      throw new Error(`Failed to delete post: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // Get posts by tag (server-side)
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      return mockPosts.filter(post => post.tags.includes(tag));
    }

    try {
      const querySnapshot = await adminDb
        .collection("posts")
        .where("tags", "array-contains", tag)
        .orderBy("createdAt", "desc")
        .get();

      return querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updatedAt:
            data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
          readingTime:
            data.readingTime || calculateReadingTime(data.content || ""),
        };
      }) as BlogPost[];
    } catch (error) {
      console.error("Error getting posts by tag:", error);
      console.warn("Falling back to mock data");
      return mockPosts.filter(post => post.tags.includes(tag));
    }
  },

  // Get featured posts (server-side)
  async getFeaturedPosts(): Promise<BlogPost[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      return mockPosts.filter(post => post.featured);
    }

    try {
      const querySnapshot = await adminDb
        .collection("posts")
        .where("featured", "==", true)
        .orderBy("createdAt", "desc")
        .get();

      return querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updatedAt:
            data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
          readingTime:
            data.readingTime || calculateReadingTime(data.content || ""),
        };
      }) as BlogPost[];
    } catch (error) {
      console.error("Error getting featured posts:", error);
      console.warn("Falling back to mock data");
      return mockPosts.filter(post => post.featured);
    }
  },

  // Get post by ID (server-side)
  async getPostById(id: string): Promise<BlogPost | null> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      const mockPost = mockPosts.find(post => post.id === id);
      return mockPost || null;
    }

    try {
      const docRef = adminDb.collection("posts").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt:
          data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
        readingTime:
          data.readingTime || calculateReadingTime(data.content || ""),
      } as BlogPost;
    } catch (error) {
      console.error("Error getting post by ID:", error);
      console.warn("Falling back to mock data");
      const mockPost = mockPosts.find(post => post.id === id);
      return mockPost || null;
    }
  },

  // Get all tags with post counts (server-side)
  async getAllTags(): Promise<BlogTag[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      const tagCounts: { [key: string]: number } = {};
      mockPosts.forEach(post => {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      
      return Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }));
    }

    try {
      const querySnapshot = await adminDb.collection("posts").get();
      const tagCounts: { [key: string]: number } = {};

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      return Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }));
    } catch (error) {
      console.error("Error getting tags:", error);
      console.warn("Falling back to mock data");
      const tagCounts: { [key: string]: number } = {};
      mockPosts.forEach(post => {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      
      return Object.entries(tagCounts).map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }));
    }
  },

  // Static method to get posts directly without service layer
  async getPostsStatic(): Promise<BlogPost[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      return mockPosts;
    }

    const querySnapshot = await adminDb.collection("posts").get();
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];
  },

  // Search posts method
  async searchPosts(query: string): Promise<BlogPost[]> {
    if (!isFirebaseAvailable || !adminDb) {
      console.warn("Firebase not available - using mock data");
      return mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    try {
      // Since Firestore doesn't have full-text search, we'll get all posts and filter
      const querySnapshot = await adminDb
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();

      const allPosts = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updatedAt:
            data.updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
          readingTime:
            data.readingTime || calculateReadingTime(data.content || ""),
        };
      }) as BlogPost[];

      // Filter posts based on search query
      const searchQuery = query.toLowerCase();
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    } catch (error) {
      console.error("Error searching posts:", error);
      console.warn("Falling back to mock data");
      return mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
  },
};

// Export individual functions for backward compatibility
export const createPost = serverBlogService.createPost;
export const getAllPosts = serverBlogService.getAllPosts;
export const getPostBySlug = serverBlogService.getPostBySlug;
export const updatePost = serverBlogService.updatePost;
export const deletePost = serverBlogService.deletePost;
export const getPostsByTag = serverBlogService.getPostsByTag;
export const getFeaturedPosts = serverBlogService.getFeaturedPosts;
export const getPostById = serverBlogService.getPostById;
export const getAllTags = serverBlogService.getAllTags;
export const searchPosts = serverBlogService.searchPosts;