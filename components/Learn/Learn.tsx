import { Button } from "..";
import { VideoCard } from "../Card/VideoCard";
import type { VideoCardProps } from "../Card/VideoCard";

type LearnProps = {
  LearnItems: VideoCardProps[];
};

function Learn({ LearnItems }: LearnProps) {
  return (
    <section id="learn" className=" md:py-24 py-12 bg-subtle">
      <div className="page-center">
        <div className="flex gap-4 items-center">
          <div className="flex-1 gap-6 grid">
            <h2 className="text-3xl font-bold text-ink ">Learn with Mareta</h2>
            <p className="text-lg font-light text-ink w-full md:w-9/12">
              Dive into my step-by-step tutorials and exclusive courses designed
              to enhance your skills in UI/UX design and front-end development.
            </p>
          </div>
          <Button
            variant="secondary"
            href="https://www.youtube.com/@maretacodes2940/videos"
          >
            View all
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {LearnItems.map((item, index) => (
            <VideoCard
              key={index}
              banner={item.banner}
              title={item.title}
              description={item.description}
              alt={item.alt}
              url={item.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { Learn };
