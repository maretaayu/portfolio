import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { BlogPost, BlogTag } from "../types/blog";

const POSTS_COLLECTION = "blog_posts";
const TAGS_COLLECTION = "blog_tags";

// Helper function to convert Firestore timestamp to ISO string
const convertTimestamp = (timestamp: any): string => {
  if (timestamp && timestamp.toMillis) {
    return new Date(timestamp.toMillis()).toISOString();
  }
  return new Date().toISOString();
};

// Helper function to convert Firestore document to BlogPost
const docToBlogPost = (doc: DocumentData): BlogPost => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    publishedAt: convertTimestamp(data.publishedAt),
    createdAt:
      convertTimestamp(data.createdAt) || convertTimestamp(data.publishedAt),
    updatedAt: convertTimestamp(data.updatedAt),
    tags: data.tags || [],
    featured: data.featured || false,
    readingTime: data.readingTime || 5,
    language: data.language || "en",
    views: data.views || 0,
    likes: data.likes || 0,
    author: data.author || "Mareta",
  };
};

// Create a new blog post
export async function createPost(
  postData: Omit<
    BlogPost,
    "id" | "publishedAt" | "updatedAt" | "views" | "likes"
  >
): Promise<string> {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      publishedAt: now,
      updatedAt: now,
      views: 0,
      likes: 0,
    });

    // Update tag counts
    await updateTagCounts();

    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, POSTS_COLLECTION), orderBy("publishedAt", "desc"))
    );

    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}

// Get latest posts
export async function getLatestPosts(
  limitCount: number = 3
): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, POSTS_COLLECTION),
        orderBy("publishedAt", "desc"),
        limit(limitCount)
      )
    );

    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error("Error getting latest posts:", error);
    return [];
  }
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, POSTS_COLLECTION),
        where("featured", "==", true),
        orderBy("publishedAt", "desc")
      )
    );

    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error("Error getting featured posts:", error);
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, POSTS_COLLECTION), where("slug", "==", slug))
    );

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    // Increment view count
    await updateDoc(doc.ref, {
      views: (doc.data().views || 0) + 1,
    });

    return docToBlogPost(doc);
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return null;
  }
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, POSTS_COLLECTION),
        where("tags", "array-contains", tag),
        orderBy("publishedAt", "desc")
      )
    );

    return querySnapshot.docs.map(docToBlogPost);
  } catch (error) {
    console.error("Error getting posts by tag:", error);
    return [];
  }
}

// Update a blog post
export async function updatePost(
  postId: string,
  updates: Partial<BlogPost>
): Promise<void> {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });

    // Update tag counts if tags were modified
    if (updates.tags) {
      await updateTagCounts();
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// Delete a blog post
export async function deletePost(postId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, POSTS_COLLECTION, postId));

    // Update tag counts
    await updateTagCounts();
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// Search posts
export async function searchPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation - for production, consider using Algolia or similar
    const querySnapshot = await getDocs(collection(db, POSTS_COLLECTION));
    const allPosts = querySnapshot.docs.map(docToBlogPost);

    const searchLower = searchTerm.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}

// Get all tags with counts
export async function getAllTags(): Promise<BlogTag[]> {
  try {
    const querySnapshot = await getDocs(collection(db, TAGS_COLLECTION));

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          slug: data.slug,
          count: data.count || 0,
        };
      })
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("Error getting tags:", error);
    return [];
  }
}

// Update tag counts (called after post create/update/delete)
async function updateTagCounts(): Promise<void> {
  try {
    const postsSnapshot = await getDocs(collection(db, POSTS_COLLECTION));
    const tagCounts: { [key: string]: number } = {};

    // Count tags from all posts
    postsSnapshot.docs.forEach((doc) => {
      const tags = doc.data().tags || [];
      tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Get current tags collection
    const tagsSnapshot = await getDocs(collection(db, TAGS_COLLECTION));
    const existingTags = new Set(
      tagsSnapshot.docs.map((doc) => doc.data().name)
    );

    // Update existing tags and add new ones
    const updatePromises: Promise<any>[] = [];

    Object.entries(tagCounts).forEach(([tagName, count]) => {
      const slug = tagName.toLowerCase().replace(/\s+/g, "-");

      if (existingTags.has(tagName)) {
        // Update existing tag
        const tagDoc = tagsSnapshot.docs.find(
          (doc) => doc.data().name === tagName
        );
        if (tagDoc) {
          updatePromises.push(updateDoc(tagDoc.ref, { count }));
        }
      } else {
        // Add new tag
        updatePromises.push(
          addDoc(collection(db, TAGS_COLLECTION), {
            name: tagName,
            slug,
            count,
          })
        );
      }
    });

    // Remove tags that no longer have posts
    tagsSnapshot.docs.forEach((doc) => {
      const tagName = doc.data().name;
      if (!tagCounts[tagName]) {
        updatePromises.push(deleteDoc(doc.ref));
      }
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating tag counts:", error);
  }
}

// Like a post
export async function likePost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const currentLikes = postDoc.data().likes || 0;
      await updateDoc(postRef, {
        likes: currentLikes + 1,
      });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}
