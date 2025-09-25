"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "../../types/blog";
import { useApp } from "../../context/AppContext";

interface LatestStoriesProps {
  posts: BlogPost[];
}

export function LatestStories({ posts }: LatestStoriesProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

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

  const cardVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  if (posts.length === 0) return null;

  return (
    <section
      className={`py-16 lg:py-24 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
          {/* Section Title with Better Spacing */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div
                className={`text-sm font-light tracking-widest uppercase mb-3 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Latest Stories
              </div>
              <h2
                className={`text-3xl lg:text-4xl font-light ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Recent Posts
              </h2>
            </div>

            {/* View All Link */}
            <Link
              href="/story"
              className={`text-sm font-light hover:text-blue-600 transition-colors duration-300 flex items-center space-x-1 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <span>View all stories</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover="hover"
              className="group cursor-pointer w-full"
            >
              <Link href={`/story/${post.slug}`}>
                <div
                  className={`h-full w-full p-6 rounded-xl border transition-all duration-300 flex flex-col ${
                    isDark
                      ? "bg-gray-800/30 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {/* Post Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-light ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`text-xs font-light ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {post.readingTime} min read
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-light leading-tight group-hover:text-blue-600 transition-colors duration-300 mb-3 line-clamp-2 break-words ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      {post.title}
                    </h3>

                    <p
                      className={`text-sm font-light leading-relaxed line-clamp-3 mb-4 break-words ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 text-xs font-light rounded-lg border ${
                            isDark
                              ? "bg-gray-800/30 border-gray-700 text-gray-400"
                              : "bg-gray-50 border-gray-200 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="pt-2">
                      <span
                        className={`text-sm font-light group-hover:text-blue-600 transition-colors duration-300 flex items-center space-x-1 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <span>Read more</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link
            href="/story"
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full border font-light transition-all duration-300 hover:scale-105 ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black hover:border-black"
            }`}
          >
            <span>View All Stories</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
