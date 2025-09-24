import { useRouter } from "next/router";
import { Portfolio } from "./Portfolio";
import { useApp } from "../../context/AppContext";

function PortfolioContainer() {
  const router = useRouter();
  const { t } = useApp();

  const portfolioItems = [
    {
      banner: "/images/PortoUIUX.svg",
      title: t("portfolio.uiux.title"),
      description: t("portfolio.uiux.desc"),
      alt: "UI/UX Illustration",
      onClick: () => {
        router.push("/uiux");
      },
    },
    {
      banner: "/images/PortoFrontend.svg",
      title: t("portfolio.frontend.title"),
      description: t("portfolio.frontend.desc"),
      alt: "Frontend Illustration",
      onClick: () => {
        router.push("/frontend");
      },
    },
    {
      banner: "/images/PortoContent.svg",
      title: t("portfolio.content.title"),
      description: t("portfolio.content.desc"),
      alt: "Content Creation Illustration",
      onClick: () => {
        router.push("https://www.instagram.com/maretacodes");
      },
    },
  ];

  return <Portfolio portfolioItems={portfolioItems} />;
}

export { PortfolioContainer };
