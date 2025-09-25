import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "../../components/Header/Header";
import { BlogGrid } from "../../components/Blog/BlogGrid";
import { BlogPost, BlogTag } from "../../types/blog";
import { serverBlogService } from "../../services/serverBlogService";
import { useApp } from "../../context/AppContext";
import Link from "next/link";
import { motion } from "framer-motion";

interface TagPageProps {
  posts: BlogPost[];
  tag: string;
  allTags: BlogTag[];
}

export default function TagPage({ posts, tag, allTags }: TagPageProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

  const currentTag = allTags.find((t) => t.slug === tag);
  const relatedTags = allTags.filter((t) => t.slug !== tag).slice(0, 10);

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
    <>
      <Head>
        <title>#{currentTag?.name || tag} Stories | Mareta&rsquo;s Blog</title>
        <meta
          name="description"
          content={`All stories tagged with ${
            currentTag?.name || tag
          }. Explore ${posts.length} articles on this topic.`}
        />
        <meta
          property="og:title"
          content={`#${currentTag?.name || tag} Stories`}
        />
        <meta
          property="og:description"
          content={`All stories tagged with ${currentTag?.name || tag}`}
        />
      </Head>

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
            {/* Back Link */}
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
                <span>Back to All Stories</span>
              </Link>
            </motion.div>

            {/* Page Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  isDark ? "bg-blue-600/20" : "bg-blue-100"
                }`}
              >
                <span
                  className={`text-2xl ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  #
                </span>
              </div>

              <h1
                className={`text-4xl md:text-5xl font-light mb-4 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                #{currentTag?.name || tag}
              </h1>

              <p
                className={`text-xl font-light mb-6 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {posts.length} {posts.length === 1 ? "story" : "stories"} tagged
                with this topic
              </p>

              {currentTag?.description && (
                <p
                  className={`text-lg font-light max-w-2xl mx-auto ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {currentTag.description}
                </p>
              )}
            </motion.div>

            {/* Blog Grid */}
            <motion.div variants={itemVariants}>
              <BlogGrid posts={posts} showFeatured={false} />
            </motion.div>

            {/* Related Tags */}
            {relatedTags.length > 0 && (
              <motion.div variants={itemVariants} className="mt-16 pt-16">
                <div
                  className={`border-t pt-16 ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-2xl font-light mb-6 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    Explore Other Topics
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {relatedTags.map((relatedTag) => (
                      <Link
                        key={relatedTag.slug}
                        href={`/tag/${relatedTag.slug}`}
                        className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        #{relatedTag.name} ({relatedTag.count})
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tag = params?.tag as string;
  
  if (!tag) {
    return {
      notFound: true,
    };
  }

  try {
    const posts = await serverBlogService.getPostsByTag(tag);
    const allTags = await serverBlogService.getAllTags();
    
    // Convert tag names to BlogTag format with slugs
    const tagObjects: BlogTag[] = allTags.map((tagName: string) => ({
      name: tagName,
      slug: tagName.toLowerCase().replace(/\s+/g, '-'),
      count: 0, // We'll get count from posts
    }));

    // Count posts for each tag
    const allPosts = await serverBlogService.getAllPosts();
    const tagCounts = new Map<string, number>();
    
    allPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tagName => {
          tagCounts.set(tagName, (tagCounts.get(tagName) || 0) + 1);
        });
      }
    });

    // Update counts in tagObjects
    const tagsWithCounts = tagObjects.map(tagObj => ({
      ...tagObj,
      count: tagCounts.get(tagObj.name) || 0,
    }));

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)), // Serialize dates
        tag,
        allTags: tagsWithCounts,
      },
    };
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return {
      notFound: true,
    };
  }
};
