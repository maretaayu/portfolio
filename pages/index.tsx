import { Layout, Hero } from "../components";
import { SectionJourney } from "../components/Section/SectionJourney";
import { PortfolioContainer } from "../components/Portfolio/PortfolioContainer";
import { LearnContainer } from "../components/Learn/LearnContainer";
import { SectionContact } from "../components/Section/SectionContact";
import { SectionFooter } from "../components/Section/SectionFooter";

export default function Page() {
  return (
    <Layout pageTitle="Homepage">
      <Hero />
      <SectionJourney />
      <PortfolioContainer />
      <LearnContainer />
      <SectionContact />
    </Layout>
  );
}
