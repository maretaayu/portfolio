import { useRouter } from "next/router";

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
};

function Button({ variant, children, className, onClick, href }: ButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
    if (href) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <button
      className={`button button-${variant} ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export { Button };
