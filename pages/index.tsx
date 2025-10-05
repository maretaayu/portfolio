import Head from "next/head";
import { Layout, Hero } from "../components";
import { SectionJourney } from "../components/Section/SectionJourney";
import { PortfolioContainer } from "../components/Portfolio/PortfolioContainer";
import { CollaborationSection } from "../components/Collaboration/CollaborationSection";
import { ResourcesSection } from "../components/Resources";

export default function Page() {
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
      <ResourcesSection />
      <CollaborationSection />
    </Layout>
  );
}

