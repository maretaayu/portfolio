import Image from "next/image";
import { Button } from "../Button";

type CardProps = {
  banner: string;
  title: string;
  description: string;
  alt: string;
  onClick?: () => void;
};

function Card({ banner, title, description, alt, onClick }: CardProps) {
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
        />
      </div>
      <div className="p-3 grid gap-4">
        <div className="grid gap-2">
          <h3 className="text-ink font-bold text-xl mt-4">{title}</h3>
          <p className="text-ink font-light text-md mt-2">{description}</p>
        </div>
        <Button className="mt-4" variant="primary" onClick={onClick}>
          View more
        </Button>
      </div>
    </div>
  );
}

export { Card };
export type { CardProps };
