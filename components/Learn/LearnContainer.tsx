import { Learn } from "./Learn";

const LearnItems = [
  {
    banner: "/images/ThumbnailFirst.png",
    title: "Slicing Responsive Personal Website HTML CSS & Deploy to Vercel",
    description:
      "Perfect for mastering responsive web design with pure HTML & CSS",
    alt: "HTML CSS",
    url: "https://www.youtube.com/watch?v=BSHd1tLAJog",
  },
  {
    banner: "/images/ThumbnailSecond.png",
    title: "Landing Page UI Design Tutorial with Figma",
    description:
      "Ideal for those wanting to dive into the complete landing page design process using Figma.",
    alt: "UI/UX Design",
    url: "https://www.youtube.com/watch?v=1ZGgcCYmvYU",
  },
  {
    banner: "/images/ThumbThird.png",
    title: "Slicing Landing Page Personal Website - Bootstrap ",
    description:
      "Great for quickly building responsive websites using the powerful Bootstrap framework.",
    alt: "Bootstrap",
    url: "https://www.youtube.com/watch?v=-2kg-8ns8oE",
  },
];

const LearnContainer: React.FC = () => {
  return <Learn LearnItems={LearnItems} />;
};

export { LearnContainer };
