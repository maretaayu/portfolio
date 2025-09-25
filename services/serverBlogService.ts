import { adminDb } from "../lib/firebase-admin";
import { BlogPost, BlogTag } from "../types/blog";
import { Timestamp } from "firebase-admin/firestore";

// Calculate reading time (average reading speed: 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Server-side blog service using Admin SDK
export const serverBlogService = {
  // Create new post (server-side)
  async createPost(
    postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
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
      throw new Error("Failed to fetch posts");
    }
  },

  // Get post by slug (server-side)
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
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
      return {
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
        updatedAt:
          doc.data().updatedAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
      } as BlogPost;
    } catch (error) {
      console.error("Error getting post by slug:", error);
      throw new Error("Failed to fetch post");
    }
  },

  // Update post (server-side)
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    try {
      await adminDb
        .collection("posts")
        .doc(id)
        .update({
          ...updates,
          updatedAt: Timestamp.now(),
        });

      console.log("Post updated:", id);
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Failed to update post");
    }
  },

  // Delete post (server-side)
  async deletePost(id: string): Promise<void> {
    try {
      await adminDb.collection("posts").doc(id).delete();

      console.log("Post deleted:", id);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    }
  },

  // Search posts (server-side)
  async searchPosts(searchTerm: string): Promise<BlogPost[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple implementation that searches in title
      const querySnapshot = await adminDb
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();

      const allPosts = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as BlogPost[];

      // Filter by search term (case-insensitive)
      return allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    } catch (error) {
      console.error("Error searching posts:", error);
      throw new Error("Failed to search posts");
    }
  },

  // Get posts by tag (server-side)
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
      const querySnapshot = await adminDb
        .collection("posts")
        .where("tags", "array-contains", tag)
        .orderBy("createdAt", "desc")
        .get();

      return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as BlogPost[];
    } catch (error) {
      console.error("Error getting posts by tag:", error);
      throw new Error("Failed to fetch posts by tag");
    }
  },

  // Increment views (server-side)
  async incrementViews(id: string): Promise<void> {
    try {
      const docRef = adminDb.collection("posts").doc(id);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const currentViews = docSnap.data()?.views || 0;
        await docRef.update({
          views: currentViews + 1,
        });
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
      // Don't throw error for views increment failure
    }
  },

  // Get all unique tags (server-side)
  async getAllTags(): Promise<string[]> {
    try {
      const querySnapshot = await adminDb.collection("posts").get();
      const tagsSet = new Set<string>();

      querySnapshot.docs.forEach((doc: any) => {
        const tags = doc.data().tags || [];
        tags.forEach((tag: string) => tagsSet.add(tag));
      });

      return Array.from(tagsSet).sort();
    } catch (error) {
      console.error("Error getting tags:", error);
      throw new Error("Failed to fetch tags");
    }
  },
};

// Export individual functions for easier import
export const getAllPosts = serverBlogService.getAllPosts;
export const getPostBySlug = serverBlogService.getPostBySlug;
export const getAllTags = async () => {
  try {
    const querySnapshot = await adminDb.collection("posts").get();
    const tagCounts = new Map<string, number>();

    querySnapshot.docs.forEach((doc: any) => {
      const tags = doc.data().tags || [];
      tags.forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error getting tags with counts:", error);
    throw new Error("Failed to fetch tags");
  }
};
