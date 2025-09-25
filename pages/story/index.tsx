"use client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../../components/Header/Header";
import { BlogGrid } from "../../components/Blog/BlogGrid";
import { BlogPost, BlogTag } from "../../types/blog";
import { getAllPosts, getAllTags } from "../../services/serverBlogService";
import { useApp } from "../../context/AppContext";
import Link from "next/link";

interface StoryPageProps {
  posts: BlogPost[];
  tags: BlogTag[];
}

export default function StoryPage({ posts, tags }: StoryPageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  // Filter posts based on selected tag and search query
  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      !selectedTag ||
      post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesTag && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />

      <motion.main
        className="pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1
              className={`text-5xl md:text-6xl font-light mb-6 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Stories
            </h1>
            <p
              className={`text-xl font-light max-w-3xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Thoughts on tech, career transitions, and building in public. My
              journey from marketing to software engineering and everything in
              between.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <svg
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border font-light transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-transparent"
                        : "bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                </div>
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                    !selectedTag
                      ? "bg-blue-600 !text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={!selectedTag ? { color: "white" } : {}}
                >
                  All ({posts.length})
                </button>
                {tags.slice(0, 5).map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => setSelectedTag(tag.name)}
                    className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                      selectedTag === tag.name
                        ? "bg-blue-600 !text-white"
                        : isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={selectedTag === tag.name ? { color: "white" } : {}}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            <div className="mt-4">
              <p
                className={`text-sm font-light ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Showing {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "story" : "stories"}
                {selectedTag && (
                  <span className="ml-2">
                    filtered by
                    <span
                      className={`mx-1 px-2 py-1 rounded text-xs ${
                        isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedTag}
                    </span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`ml-2 text-xs underline hover:no-underline ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Clear filter
                    </button>
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div variants={itemVariants}>
            <BlogGrid posts={filteredPosts} />
          </motion.div>

          {/* Browse by Topic Section */}
          <motion.div variants={itemVariants} className="mt-16 pt-16 border-t">
            <div
              className={`border-t ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl font-light mb-6 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Browse by Topic
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/tag/${
                      tag.slug || tag.name.toLowerCase().replace(/\s+/g, "-")
                    }`}
                    className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    #{tag.name} ({tag.count})
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getAllPosts();
    const tags = await getAllTags();

    return {
      props: {
        posts,
        tags,
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return {
      props: {
        posts: [],
        tags: [],
      },
    };
  }
};
