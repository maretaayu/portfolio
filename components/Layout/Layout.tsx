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
      <Header />
      {children}
      <Analytics />
    </>
  );
}

export { Layout };
