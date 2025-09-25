import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "../../components/Header/Header";
import { BlogArticle } from "../../components/Blog/BlogArticle";
import { BlogPost } from "../../types/blog";
import { getPostBySlug } from "../../services/serverBlogService";
import { useApp } from "../../context/AppContext";

interface ArticlePageProps {
  post: BlogPost;
}

export default function ArticlePage({ post }: ArticlePageProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-2xl font-light mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Article not found
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            The article you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Mareta&rsquo;s Stories</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={post.author || "Mareta"} />
        <meta property="article:published_time" content={post.createdAt} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Head>

      <div
        className={`min-h-screen transition-colors duration-500 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogArticle post={post} />
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  try {
    const post = await getPostBySlug(params.slug as string);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
};
