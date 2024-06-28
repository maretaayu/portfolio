import { ReactNode } from "react";
import { Header } from "../Header";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
};

function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Mareta | {pageTitle}</title>
        <meta name="description" content="Home page" />
      </Head>
      <Header />
      {children}
      <Analytics />
    </>
  );
}

export { Layout };
