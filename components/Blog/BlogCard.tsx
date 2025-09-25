"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/blog";
import { useApp } from "../../context/AppContext";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group cursor-pointer w-full"
    >
      <Link href={`/story/${post.slug}`}>
        <div
          className={`h-full p-6 rounded-2xl border transition-all duration-300 ${
            isDark
              ? "bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800"
              : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              {post.featured && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isDark
                      ? "bg-yellow-400/20 text-yellow-400"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  Featured
                </span>
              )}
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <span
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {post.readingTime || 5} min read
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3
              className={`font-light leading-tight group-hover:text-blue-600 transition-colors duration-300 text-xl ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {post.title}
            </h3>

            <p
              className={`font-light leading-relaxed text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {post.excerpt}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1.5 text-xs font-light rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/50"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span
                className={`px-3 py-1.5 text-xs font-light rounded-lg ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read More */}
          <div className="mt-6">
            <span
              className={`text-sm font-light group-hover:text-blue-600 transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
