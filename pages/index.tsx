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
        <title>
          Mareta: Sharing Frontend & UI/UX Insights as a Mentor & Tech Content
          Creator
        </title>
        <meta
          name="description"
          content="Mareta is a Frontend Engineer with a strong UI/UX design background, specializing in React, Next.js, and JavaScript. Passionate about creating intuitive web experiences, she shares insights on frontend development and UI/UX through content and mentorship, bridging design and functionality seamlessly. 🚀"
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
