import { useRouter } from "next/router";
import { Learn } from "./Learn";

function LearnContainer() {
  const router = useRouter();

  const LearnItems = [
    {
      banner: "/images/PortoUIUX.svg",
      title: "UI/UX",
      description:
        "This course is perfect if you’re just starting out in UI/UX design. You’ll learn essential design principles, how to create wireframes and prototypes, and techniques to design intuitive user experiences. ",
      alt: "UI/UX Illustration",
      basePrice: 1500000,
      finalPrice: 1200000,
      onClick: () => {
        router.push("https://forms.gle/1Xn1v9MDuENrxaxV7");
      },
      buttonLabel: "Join class",
      withPriceList: true,
    },
    {
      banner: "/images/PortoFrontend.svg",
      title: "Private UI/UX",
      description:
        "Perfect for beginners in UI/UX design, this private course offers personalized guidance to master design principles, create wireframes and prototypes, and craft intuitive user experiences. By the end, you’ll have a portfolio-ready project made with Figma.",
      alt: "UI/UX Illustration",
      basePrice: 3000000,
      finalPrice: 2400000,
      sessionPrice: 300000,
      onClick: () => {
        router.push("https://forms.gle/kA9Ci2Y1rb7AX8ns8");
      },
      withPriceList: true,
      buttonLabel: "Join class",
    },
    {
      banner: "/images/PortoContent.svg",
      title: "React: Building Dynamic Frontend Applications",
      description:
        "Learn how to create dynamic web applications using React. This course covers React fundamentals, state management, and routing, ensuring you have the skills to build modern, interactive interfaces.",
      alt: "Frontend",
      buttonLabel: "Coming soon",
      onClick: () => {
        alert("Coming soon");
      },
    },
  ];
  return <Learn LearnItems={LearnItems} />;
}

export { LearnContainer };
