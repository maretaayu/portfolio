import Head from "next/head";
import { Layout, Hero } from "../components";
import { SectionJourney } from "../components/Section/SectionJourney";
import { PortfolioContainer } from "../components/Portfolio/PortfolioContainer";
import { LearnContainer } from "../components/Learn/LearnContainer";
import { SectionContact } from "../components/Section/SectionContact";

export default function Page() {
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
      <LearnContainer />
      <SectionContact />
    </Layout>
  );
}
