import { useRouter } from "next/router";
import { Portfolio } from "./Portfolio";

function PortfolioContainer() {
  const router = useRouter();

  const portfolioItems = [
    {
      banner: "/images/PortoUIUX.svg",
      title: "UI/UX",
      description:
        "Transforming ideas into visually stunning interfaces. Elevating user experiences through intuitive designs that captivate.",
      alt: "UI/UX Illustration",
      onClick: () => {
        router.push("/uiux");
      },
    },
    {
      banner: "/images/PortoFrontend.svg",
      title: "Frontend",
      description:
        "Crafting smooth, responsive web experiences and adherence to best practices for search visibility.",
      alt: "Frontend Illustration",
      onClick: () => {
        router.push("/frontend");
      },
    },
    {
      banner: "/images/PortoContent.svg",
      title: "Content Creation",
      description:
        "Demystifying tech through engaging storytelling. Creating content that educates and inspires.",
      alt: "Content Creation Illustration",
      onClick: () => {
        router.push("https://www.instagram.com/maretacodes");
      },
    },
  ];
  return <Portfolio portfolioItems={portfolioItems} />;
}

export { PortfolioContainer };
