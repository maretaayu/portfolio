import Head from "next/head";
import { GetServerSideProps } from "next";
import { Layout, Hero } from "../components";
import { SectionJourney } from "../components/Section/SectionJourney";
import { PortfolioContainer } from "../components/Portfolio/PortfolioContainer";
import { LearnContainer } from "../components/Learn/LearnContainer";
import { LatestStories } from "../components/Blog/LatestStories";
import { SectionContact } from "../components/Section/SectionContact";
import { BlogPost } from "../types/blog";
import { serverBlogService } from "../services/serverBlogService";

interface HomePageProps {
  latestPosts: BlogPost[];
}

export default function Page({ latestPosts }: HomePageProps) {
  return (
    <Layout pageTitle="Homepage">
      <Head>
        <title>Mareta - Frontend Engineer & UI/UX Designer</title>
        <meta
          name="description"
          content="Mareta is a Frontend Engineer with a strong UI/UX design background, specializing in React, Next.js, and JavaScript."
        />
      </Head>
      <Hero />
      <SectionJourney />
      <PortfolioContainer />
      <LatestStories posts={latestPosts} />
      <LearnContainer />
      <SectionContact />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const allPosts = await serverBlogService.getAllPosts();
    const latestPosts = allPosts.slice(0, 3);

    return {
      props: {
        latestPosts,
      },
    };
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return {
      props: {
        latestPosts: [],
      },
    };
  }
};
