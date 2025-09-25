"use client";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { useApp } from "../../context/AppContext";
// Using API routes instead of direct service
import { BlogPost } from "../../types/blog";
import Link from "next/link";

export default function ManagePostsPage() {
  const { theme } = useApp();
  const isDark = theme === "dark";

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Failed to delete post");
      console.error("Error deleting post:", err);
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ featured: !post.featured }),
      });
      if (!response.ok) throw new Error("Failed to update post");
      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, featured: !p.featured } : p
        )
      );
    } catch (err) {
      setError("Failed to update post");
      console.error("Error updating post:", err);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen transition-colors duration-500 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Loading posts...
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className={`text-4xl font-light mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Manage Posts
              </h1>
              <p
                className={`text-lg font-light ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {posts.length} posts total
              </p>
            </div>

            <Link
              href="/admin/create-post"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors duration-300"
            >
              Create New Post
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {/* Posts Table */}
          <div
            className={`rounded-xl border overflow-hidden ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Title
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Status
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Published
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Stats
                    </th>
                    <th
                      className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? "divide-gray-700" : "divide-gray-200"
                  }`}
                >
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className={`hover:${
                        isDark ? "bg-gray-700/50" : "bg-gray-50"
                      } transition-colors duration-200`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div
                            className={`text-sm font-medium ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            {post.title}
                          </div>
                          <div
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            /{post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {post.featured && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isDark
                                ? "bg-green-800 text-green-300"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            Published
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <div>{post.views || 0} views</div>
                          <div>{post.likes || 0} likes</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/story/${post.slug}`}
                            className={`text-sm hover:text-blue-600 transition-colors ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/edit-post/${post.id}`}
                            className={`text-sm hover:text-green-600 transition-colors ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleToggleFeatured(post)}
                            className={`text-sm hover:text-yellow-600 transition-colors ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {post.featured ? "Unfeature" : "Feature"}
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className={`text-sm hover:text-red-600 transition-colors ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {posts.length === 0 && !loading && (
            <div className="text-center py-20">
              <div
                className={`text-6xl mb-4 ${
                  isDark ? "text-gray-600" : "text-gray-300"
                }`}
              >
                📝
              </div>
              <h3
                className={`text-xl font-light mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No posts yet
              </h3>
              <p
                className={`font-light mb-6 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Create your first blog post to get started.
              </p>
              <Link
                href="/admin/create-post"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors duration-300"
              >
                Create First Post
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
