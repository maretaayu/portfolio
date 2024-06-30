import { PortfolioDetail } from "./PortfolioDetail";
import type { CardProps } from "../Card";
import { useRouter } from "next/router";

const portfolioTitle = "UI/UX";

function PortfolioDetailUIUX() {
  const router = useRouter();
  const portfolioItems: CardProps[] = [
    {
      banner: "/images/PortfolioLoyaltysummitid.png",
      title: "Loyalty Summit",
      description: "Game changing event for loyalty industry from Usetada.",
      alt: "Loyalty Summit",
      onClick: () => {
        router.push("https://loyaltysummit.id");
      },
      companyName: "Usetada",
      details: "Design & Development 2023",
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
      details: "Design & Development 2023",
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
      details: "Design & Development 2023",
    },
    //ruangguru
    {
      banner: "/images/PortfolioBrainAcademy.png",
      title: "Brain Academy Homepage",
      description:
        "Revamp the Brain Academy website to improve user experience.",
      alt: "Brain Academy Homepage",
      onClick: () => {
        router.push("https://www.brainacademy.id");
      },
      companyName: "Ruangguru",
      details: "Design 2022",
    },
    {
      banner: "/images/PortfolioRGDesignChallenge.png",
      title: "Ruangguru Design Challenge",
      description: "Revamp the Ruangguru app to improve user experience.",
      alt: "Ruangguru Design Challenge 2021",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Ruangguru",
      details: "Design 2021",
    },

    {
      banner: "/images/PortfolioEnglishAcademyProfessional.png",
      title: "English Academy Professional",
      description: "The design for English Academy Professional's website.",
      alt: "English Academy Professional",
      onClick: () => {
        router.push("https://www.english-academy.id/corporate");
      },
      companyName: "Ruangguru",
      details: "Design 2021",
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
      companyName: "MRKR",
      details: "Design & Development 2023",
    },
    {
      banner: "/images/PortfolioMeatguy.png",
      title: "Meatguy Branch Website",
      description:
        "A website for Meatguy's branch that provides a seamless user experience.",
      alt: "Meatguy Branch Website",
      onClick: () => {
        router.push("https://meatguy.id/outlet/scbd");
      },
      companyName: "Meatguy",
      details: "Design 2023",
    },
    {
      banner: "/images/PortfolioNiche.png",
      title: "Niche Homepage",
      description: "A proposal for Niche's homepage design with a modern look.",
      alt: "Niche Website",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Niche",
      details: "Design 2023",
    },

    //exploration
    {
      banner: "/images/PortfolioDoctorApp.png",
      title: "Doctor App",
      description: "Design for chat-based doctor consultation app.",
      alt: "Doctor App",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Exploration",
      details: "Design 2021",
    },
    {
      banner: "/images/PortfolioMeditate.png",
      title: "Meditate App",
      description:
        "Design for meditation app that helps users to relax and meditate.",
      alt: "Meditate App",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Exploration",
      details: "Design 2021",
    },
    {
      banner: "/images/PortfolioMyTutor.png",
      title: "MyTutor App",
      description: "Revamp the MyTutor app with a modern look.",
      alt: "MyTutor App",
      buttonLabel: "Contact me for more details",
      onClick: () => {
        alert(
          "Unable to preview this project. Please contact me for more details."
        );
      },
      companyName: "Exploration",
      details: "Design 2021",
    },
  ];
  return (
    <PortfolioDetail
      portfolioItems={portfolioItems}
      portfolioTitle={portfolioTitle}
    />
  );
}

export { PortfolioDetailUIUX };
