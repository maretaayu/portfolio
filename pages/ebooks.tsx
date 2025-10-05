import Head from "next/head";
import { Layout } from "../components";
import { EbookSection } from "../components/Ebook/EbookSection";

export default function EbooksPage() {
  return (
    <Layout pageTitle="E-books">
      <Head>
        <title>Mareta Ayu Handanari | E-books</title>
        <meta
          name="description"
          content="Explore digital products and e-books created by Mareta Ayu Handanari for builders who learn by doing."
        />
      </Head>
      <EbookSection />
    </Layout>
  );
}
