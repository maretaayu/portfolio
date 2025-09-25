"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../../components/Header/Header";
import { useApp } from "../../context/AppContext";
// Using API routes instead of direct service
import { BlogPost } from "../../types/blog";

export default function CreatePostPage() {
  const { theme } = useApp();
  const router = useRouter();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content:
      "# Your Post Title\n\nWrite your content here...\n\n## Section Heading\n\nAdd more content.",
    tags: "",
    featured: false,
    language: "en" as "en" | "id",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateFormData = (data: typeof formData) => {
    const errors: string[] = [];

    if (!data.title.trim()) errors.push("Title is required");
    if (!data.excerpt.trim()) errors.push("Excerpt is required");
    if (!data.content.trim()) errors.push("Content is required");
    if (!data.tags.trim()) errors.push("At least one tag is required");
    if (data.title.length > 100)
      errors.push("Title must be less than 100 characters");
    if (data.excerpt.length > 300)
      errors.push("Excerpt must be less than 300 characters");

    return errors;
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    const validationErrors = validateFormData(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const readingTime = calculateReadingTime(formData.content);
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const postData = {
        title: formData.title.trim(),
        slug,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        tags,
        featured: formData.featured,
        readingTime,
        language: formData.language,
      };

      // Use API route instead of direct service
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      const postId = result.id;

      setSuccessMessage("Post created successfully!");
      setTimeout(() => {
        router.push(`/story/${slug}`);
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
      setErrors(["Failed to create post. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1
              key={i}
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className={`text-xl font-semibold mb-3 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className={`text-lg font-medium mb-2 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {line.substring(4)}
            </h3>
          );
        }
        if (line.trim() && !line.startsWith("#")) {
          return (
            <p
              key={i}
              className={`mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {line}
            </p>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1
              className={`text-4xl font-light mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Create New Story
            </h1>
            <p
              className={`text-lg font-light ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Write and preview your new blog post
            </p>
          </div>

          {/* Preview Toggle */}
          <div className="flex justify-center mb-8">
            <div
              className={`flex rounded-lg p-1 ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <button
                onClick={() => setIsPreview(false)}
                className={`px-4 py-2 rounded-md font-light transition-all duration-300 ${
                  !isPreview
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className={`px-4 py-2 rounded-md font-light transition-all duration-300 ${
                  isPreview
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            {!isPreview && (
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Errors */}
                  {errors.length > 0 && (
                    <div className="p-4 rounded-lg bg-red-100 border border-red-200">
                      <ul className="text-red-700 text-sm space-y-1">
                        {errors.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border font-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-black placeholder-gray-500"
                      }`}
                      placeholder="Enter your post title..."
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border font-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-black placeholder-gray-500"
                      }`}
                      placeholder="Brief description of your post..."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Tags * (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border font-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-black placeholder-gray-500"
                      }`}
                      placeholder="react, javascript, career, etc."
                    />
                  </div>

                  {/* Language & Featured */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        Language
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border font-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-black"
                        }`}
                      >
                        <option value="en">English</option>
                        <option value="id">Indonesian</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          Featured Post
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Content * (Markdown supported)
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={20}
                      className={`w-full px-4 py-3 rounded-lg border font-light font-mono text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-black placeholder-gray-500"
                      }`}
                      placeholder="Write your post content here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    {isLoading ? "Creating Post..." : "Create Post"}
                  </button>
                </form>
              </div>
            )}

            {/* Preview */}
            {isPreview && (
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="space-y-4">
                  <h1
                    className={`text-3xl font-light ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {formData.title || "Post Title"}
                  </h1>

                  <p
                    className={`text-lg font-light ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {formData.excerpt || "Post excerpt will appear here..."}
                  </p>

                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.tags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-lg border ${
                            isDark
                              ? "bg-gray-800/30 border-gray-700 text-gray-400"
                              : "bg-gray-50 border-gray-200 text-gray-600"
                          }`}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="prose max-w-none">
                    {formatContent(formData.content)}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-green-800/20 border-green-700"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p
                    className={`font-light ${
                      isDark ? "text-green-400" : "text-green-800"
                    }`}
                  >
                    {successMessage} Redirecting to post...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
