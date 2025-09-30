import { Learn } from "./Learn";
import { useApp } from "../../context/AppContext";

const LearnContainer: React.FC = () => {
  const { t } = useApp();

  const SpeakingItems = [
    {
      title: t("learn.item1.title"),
      description: t("learn.item1.desc"),
      type: "Tutorial",
      audience: "Tech professionals, career changers",
      url: "https://www.youtube.com/watch?v=BSHd1tLAJog",
      thumbnail: "https://img.youtube.com/vi/BSHd1tLAJog/hqdefault.jpg",
    },
    {
      title: t("learn.item2.title"),
      description: t("learn.item2.desc"),
      type: "Design Tutorial",
      audience: "Content creators, developers",
      url: "https://www.youtube.com/watch?v=1ZGgcCYmvYU",
      thumbnail: "https://img.youtube.com/vi/1ZGgcCYmvYU/hqdefault.jpg",
    },
    {
      title: t("learn.item3.title"),
      description: t("learn.item3.desc"),
      type: "Framework Tutorial",
      audience: "Team leads, mentors",
      url: "https://www.youtube.com/watch?v=-2kg-8ns8oE",
      thumbnail: "https://img.youtube.com/vi/-2kg-8ns8oE/hqdefault.jpg",
    },
  ];

  return <Learn speakingItems={SpeakingItems} />;
};

export { LearnContainer };
