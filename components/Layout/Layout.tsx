import { ReactNode } from "react";
import { Header } from "../Header";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SectionFooter } from "../Section/SectionFooter";

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  withHeader?: boolean;
};

function Layout({ children, withHeader = true, pageTitle }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Mareta Ayu Handanari | {pageTitle}</title>
        <meta name="description" content="Home page" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "myti20rwvy");`,
          }}
        />
      </Head>
      {withHeader && <Header />}
      {children}
      <SectionFooter />
      <Analytics />
    </>
  );
}

export { Layout };
