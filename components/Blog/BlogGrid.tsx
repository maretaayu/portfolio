"use client";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/blog";
import { BlogCard } from "./BlogCard";
import { useApp } from "../../context/AppContext";

interface BlogGridProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export function BlogGrid({ posts, showFeatured = true }: BlogGridProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Featured Posts */}
      {showFeatured && featuredPosts.length > 0 && (
        <div>
          <motion.h2
            className={`text-2xl font-light mb-8 ${
              isDark ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Featured Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <div>
          {showFeatured && featuredPosts.length > 0 && (
            <motion.h2
              className={`text-2xl font-light mb-8 ${
                isDark ? "text-white" : "text-black"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Latest Stories
            </motion.h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
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
            No stories yet
          </h3>
          <p
            className={`font-light ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Check back soon for new content!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
