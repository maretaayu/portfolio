"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../../../components/Header/Header";
import { useApp } from "../../../context/AppContext";
import { BlogPost } from "../../../types/blog";
import Link from "next/link";

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  language: "en" | "id";
  author: string;
}

export default function EditPostPage() {
  const { theme } = useApp();
  const isDark = theme === "dark";
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    featured: false,
    language: "en",
    author: "Mareta",
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const posts = await response.json();
        const post = posts.find((p: BlogPost) => p.id === id);

        if (!post) {
          setError("Post not found");
          return;
        }

        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags || [],
          featured: post.featured || false,
          language: post.language || "en",
          author: post.author || "Mareta",
        });
      } catch (err) {
        setError("Failed to fetch post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      router.push("/admin/manage-posts");
    } catch (err) {
      setError("Failed to update post. Please try again.");
      console.error("Error updating post:", err);
    } finally {
      setSaving(false);
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Loading post...
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className={`text-4xl font-light mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Edit Post
              </h1>
              <p
                className={`text-lg font-light ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Update your blog post
              </p>
            </div>

            <Link
              href="/admin/manage-posts"
              className={`px-4 py-2 border rounded-lg font-light transition-colors duration-300 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              ← Back to Posts
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter post title..."
              />
            </div>

            {/* Slug */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="post-url-slug"
              />
              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                URL: /story/{formData.slug}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                required
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Brief description of the post..."
              />
            </div>

            {/* Content */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                required
                rows={20}
                className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Write your post content in markdown format..."
              />
              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                You can use markdown formatting (# for headers, **bold**,
                *italic*, etc.)
              </p>
            </div>

            {/* Tags */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Tags
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Add tags..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors duration-300"
                >
                  Add
                </button>
              </div>

              {/* Tag Display */}
              {formData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm font-light flex items-center space-x-2 ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Options Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Language */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      language: e.target.value as "en" | "id",
                    }))
                  }
                  className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                      : "bg-white border-gray-300 text-black focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="en">English</option>
                  <option value="id">Indonesian</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-lg border font-light transition-colors duration-300 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Author name"
                />
              </div>

              {/* Featured */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Featured Post
                </label>
                <div className="flex items-center h-12">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="featured"
                    className={`ml-2 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Mark as featured post
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Link
                href="/admin/manage-posts"
                className={`px-6 py-3 border rounded-lg font-light transition-colors duration-300 ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
