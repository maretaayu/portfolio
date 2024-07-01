import Image from "next/image";
import { Button } from "../Button";
import { CardDetail, type CardDetailProps } from "./CardDetail";

type CardProps = CardDetailProps & {
  banner: string;
  title: string;
  description: string;
  alt: string;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  withCardDetail?: boolean;
  buttonLabel?: string;
  buttonSecondaryLabel?: string;
};

function Card({
  banner,
  title,
  description,
  alt,
  withCardDetail = false,
  onClick,
  onSecondaryClick,
  companyName,
  details,
  buttonLabel,
  buttonSecondaryLabel,
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
            minHeight: "150px",
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
        <div className="flex gap-2">
          <Button
            className="mt-4"
            variant="primary"
            onClick={onClick}
            isFullWidth={true}
          >
            {buttonLabel || "View more"}
          </Button>
          {buttonSecondaryLabel && (
            <Button
              className="mt-4"
              variant="secondary"
              onClick={onSecondaryClick}
              isFullWidth={true}
            >
              {buttonSecondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Card };
export type { CardProps };
