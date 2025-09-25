"use client";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/blog";
import { useApp } from "../../context/AppContext";
import Link from "next/link";

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
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

  // Parse inline formatting (bold, italic, etc.)
  const parseInlineFormatting = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    let keyCounter = 0;

    // First handle **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the bold element
      parts.push(
        <strong key={`bold-${keyCounter++}`} className="font-semibold">
          {match[1]}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // If no bold text found, return the original text wrapped for consistency
    if (parts.length === 0) {
      return [text];
    }

    // Process each part for italic formatting (only non-React elements)
    const finalParts: (string | JSX.Element)[] = [];
    parts.forEach((part, index) => {
      if (typeof part === "string") {
        // Handle *italic* text in string parts
        const italicRegex = /\*(.*?)\*/g;
        let italicMatch;
        let lastItalicIndex = 0;
        const italicParts = [];

        while ((italicMatch = italicRegex.exec(part)) !== null) {
          if (italicMatch.index > lastItalicIndex) {
            italicParts.push(part.slice(lastItalicIndex, italicMatch.index));
          }

          italicParts.push(
            <em key={`italic-${keyCounter++}`} className="italic">
              {italicMatch[1]}
            </em>
          );

          lastItalicIndex = italicMatch.index + italicMatch[0].length;
        }

        if (lastItalicIndex < part.length) {
          italicParts.push(part.slice(lastItalicIndex));
        }

        finalParts.push(...(italicParts.length > 0 ? italicParts : [part]));
      } else {
        finalParts.push(part);
      }
    });

    return finalParts;
  };

  // Enhanced markdown parsing
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, i) => {
        // Skip empty lines
        if (!line.trim()) {
          return <br key={i} />;
        }

        // Headers
        if (line.startsWith("# ")) {
          return (
            <h1
              key={i}
              className={`text-3xl font-light mb-6 mt-8 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {parseInlineFormatting(line.substring(2))}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className={`text-2xl font-light mb-4 mt-6 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {parseInlineFormatting(line.substring(3))}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className={`text-xl font-light mb-3 mt-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {parseInlineFormatting(line.substring(4))}
            </h3>
          );
        }

        // Bullet points
        if (line.startsWith("- ")) {
          return (
            <li
              key={i}
              className={`ml-6 mb-2 font-light list-disc ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {parseInlineFormatting(line.substring(2))}
            </li>
          );
        }

        // Numbered lists
        if (line.match(/^\d+\./)) {
          return (
            <li
              key={i}
              className={`ml-6 mb-2 font-light list-decimal ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {parseInlineFormatting(line.replace(/^\d+\.\s*/, ""))}
            </li>
          );
        }

        // Blockquotes
        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className={`border-l-4 pl-4 my-4 italic ${
                isDark
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {parseInlineFormatting(line.substring(2))}
            </blockquote>
          );
        }

        // Regular paragraphs
        if (line.trim() && !line.startsWith("#")) {
          return (
            <p
              key={i}
              className={`mb-4 font-light leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {parseInlineFormatting(line)}
            </p>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          href="/story"
          className={`inline-flex items-center space-x-2 text-sm font-light transition-colors duration-300 ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Stories</span>
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.header variants={itemVariants} className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <span
            className={`text-sm font-light ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span
            className={`w-1 h-1 rounded-full ${
              isDark ? "bg-gray-600" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`text-sm font-light ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {post.readingTime || 5} min read
          </span>
          <span
            className={`w-1 h-1 rounded-full ${
              isDark ? "bg-gray-600" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`text-sm font-light ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            By {post.author || "Mareta"}
          </span>
        </div>

        <h1
          className={`text-4xl md:text-5xl font-light leading-tight mb-6 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {post.title}
        </h1>

        <p
          className={`text-xl font-light leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {post.excerpt}
        </p>
      </motion.header>

      {/* Article Content */}
      <motion.div
        variants={itemVariants}
        className="prose prose-lg max-w-none mb-12"
      >
        <div className="space-y-4">{formatContent(post.content)}</div>
      </motion.div>

      {/* Article Footer */}
      <motion.footer variants={itemVariants} className="border-t pt-8">
        <div
          className={`border-t pt-8 ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {/* Tags */}
          <div className="mb-6">
            <h4
              className={`text-sm font-medium mb-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Tagged in:
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3 py-1.5 text-sm font-light rounded-lg border transition-all duration-300 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/50 hover:border-gray-600"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <div
            className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <span
                  className={`text-lg font-light ${
                    isDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  M
                </span>
              </div>
              <div>
                <h4
                  className={`font-light ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {post.author}
                </h4>
                <p
                  className={`text-sm font-light ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Software Engineer & Content Creator
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.article>
  );
}
