import Image from "next/image";
import { Button } from "../Button";
import { CardDetail, type CardDetailProps } from "./CardDetail";

type CardProps = CardDetailProps & {
  banner: string;
  title: string;
  description: string;
  alt: string;
  onClick?: () => void;
  withCardDetail?: boolean;
  buttonLabel?: string;
};

function Card({
  banner,
  title,
  description,
  alt,
  withCardDetail = false,
  onClick,
  companyName,
  details,
  buttonLabel,
}: CardProps) {
  return (
    <div className="bg-invert rounded-3xl shadow-neutral p-2">
      <div className="relative ">
        <Image
          src={banner}
          alt={alt}
          objectFit="cover"
          rounded-t-2xl
          style={{
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
          width={800}
          height={150}
        />
      </div>
      <div className="p-3 grid gap-4">
        {withCardDetail && (
          <CardDetail companyName={companyName} details={details} />
        )}
        <div className="grid gap-2">
          <h3 className="text-ink font-bold text-lg mt-4">{title}</h3>
          <p className="text-ink font-light text-md mt-2">{description}</p>
        </div>
        <Button className="mt-4" variant="primary" onClick={onClick}>
          {buttonLabel || "View more"}
        </Button>
      </div>
    </div>
  );
}

export { Card };
export type { CardProps };
