import { Portfolio } from "./Portfolio";

const portfolioItems = [
  {
    banner: "/images/PortoUIUX.svg",
    title: "UI/UX",
    description:
      "Transforming ideas into visually stunning interfaces. Elevating user experiences through intuitive designs that captivate.",
    alt: "UI/UX Illustration",
    onClick: () => alert("UI/UX Clicked"),
  },
  {
    banner: "/images/PortoFrontend.svg",
    title: "Frontend",
    description:
      "Crafting smooth, responsive web experiences and adherence to best practices for search visibility.",
    alt: "Frontend Illustration",
    onClick: () => alert("Frontend Clicked"),
  },
  {
    banner: "/images/PortoContent.svg",
    title: "Content Creation",
    description:
      "Demystifying tech through engaging storytelling. Creating content that educates and inspires.",
    alt: "Content Creation Illustration",
    onClick: () => alert("Content Creation Clicked"),
  },
];

const PortfolioContainer: React.FC = () => {
  return <Portfolio portfolioItems={portfolioItems} />;
};

export { PortfolioContainer };
