import Image from "next/image";
import Link from "next/link";

type VideoCardProps = {
  banner: string;
  title: string;
  description: string;
  alt: string;
  url: string;
};

function VideoCard({ banner, title, description, alt, url }: VideoCardProps) {
  return (
    <div className="bg-invert rounded-3xl shadow-neutral p-2">
      <div className="relative ">
        <Image
          src={banner}
          alt={alt}
          objectFit="cover"
          rounded-t-2xl
          width={800}
          height={150}
          className="rounded-t-2xl"
        />
        <Link href={url} target="_blank">
          <Image
            src="/images/IconPlay.svg"
            alt="icon play"
            rounded-full
            width={48}
            height={48}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
        </Link>
      </div>
      <div className="p-3 grid gap-4">
        <div className="grid gap-2">
          <h3 className="text-ink font-bold text-xl mt-4">{title}</h3>
          <p className="text-ink font-light text-md mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

export { VideoCard };
export type { VideoCardProps };
