import { PortfolioDetail } from "./PortfolioDetail";
import type { CardProps } from "../Card";
import { useRouter } from "next/router";

const portfolioTitle = "Frontend";

function PortfolioDetailFrontend() {
  const router = useRouter();
  const portfolioItems: CardProps[] = [
    {
      banner: "/images/PortfolioAIRIS.png",
      title: "AiRIS by Ruangguru",
      description: "Developing AI-powered learning platform for students.",
      alt: "AiRIS by Ruangguru",
      onClick: () => {
        router.push("https://ai.ruangguru.com");
      },
      companyName: "Ruangguru",
      buttonLabel: "Preview",
      details: "React Native, Tamagui, TypeScript, Next.js",
    },
    {
      banner: "/images/PortfolioDesignSystem.png",
      title: "Syllabus Design System",
      description: "Developing a Ruangguru's design system for consistency.",
      alt: "Design System",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Ruangguru",
      buttonLabel: "Contact me for more details",
      details: "React Native, Storybook, Tamagui, TypeScript",
    },
    {
      banner: "/images/PortfolioTimotius.png",
      title: "Timotius's Website",
      description:
        "Developing a website for Timotius to showcase his portfolio.",
      alt: "Meatguy Branch Website",
      onClick: () => {
        router.push("https://timotiusmuliawan.com/");
      },
      companyName: "Timotius",
      buttonLabel: "Preview",
      details: "Node JS, Firestore, HTML, CSS, JS",
    },
    {
      banner: "/images/PortfolioLoyaltysummitid.png",
      title: "Loyalty Summit",
      description: "Game changing event for loyalty industry from Usetada.",
      alt: "Loyalty Summit",
      onClick: () => {
        router.push("https://loyaltysummit.id");
      },
      onSecondaryClick: () => {
        router.push("https://github.com/maretaayu/loyaltysummit");
      },
      companyName: "Usetada",
      buttonLabel: "Preview",
      buttonSecondaryLabel: "Code",
      details: "Pure HTML, CSS, JavaScript",
    },
    {
      banner: "/images/PortfolioUsetada.png",
      title: "Digital Banking Page",
      description:
        "A digital banking page that provides a seamless user experience.",
      alt: "Digital Banking Page",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Usetada",
      details: "HubSpot CMS",
    },
    {
      banner: "/images/PortfolioUsetadaSuccessStory.png",
      title: "Success Story",
      description: "Usetada's success story in transforming businesses",
      alt: "Success Story",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Usetada",
      details: "HubSpot CMS",
    },

    //freelance
    {
      banner: "/images/PortfolioPintuKebaikan.png",
      title: "Pintu Kebaikan",
      description: "Building a website for Pintu Kebaikan to help others.",
      alt: "Pintu Kebaikan",
      onClick: () => {
        router.push("https://pintu-kebaikan-bootstrap.vercel.app/");
      },
      onSecondaryClick: () => {
        router.push(
          "https://github.com/maretaayu/pintu-kebaikan/tree/main/bootstrap"
        );
      },
      buttonLabel: "Preview",
      buttonSecondaryLabel: "Code",
      companyName: "MRKR",
      details: "Bootstrap 5",
    },
  ];
  return (
    <PortfolioDetail
      portfolioItems={portfolioItems}
      portfolioTitle={portfolioTitle}
    />
  );
}

export { PortfolioDetailFrontend };
