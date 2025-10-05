import Head from "next/head";
import { GetServerSideProps } from "next";
import { Layout, Hero } from "../components";
import { SectionJourney } from "../components/Section/SectionJourney";
import { PortfolioContainer } from "../components/Portfolio/PortfolioContainer";
import { LatestStories } from "../components/Blog/LatestStories";
import { SectionContact } from "../components/Section/SectionContact";
import { ResourcesSection } from "../components/Resources";
import { BlogPost } from "../types/blog";
import { serverBlogService } from "../services/serverBlogService";

interface HomePageProps {
  latestPosts: BlogPost[];
}

export default function Page({ latestPosts }: HomePageProps) {
  return (
    <Layout pageTitle="Homepage">
      <Head>
        <title>
          Mareta Ayu Handanari | Software Engineer & Content Creator
        </title>
        <meta
          name="description"
          content="Explore the work of Mareta Ayu Handanari, a software engineer, product designer, and content creator crafting human-centered web experiences and sharing insights on design and technology."
        />
      </Head>
      <Hero />
      <SectionJourney />
      <PortfolioContainer />
      <LatestStories posts={latestPosts} />
      <ResourcesSection />
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
