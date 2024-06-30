type CardDetailProps = {
  companyName?: string;
  details?: string;
};

function CardDetail({ companyName, details }: CardDetailProps) {
  return (
    <div className=" bg-subtle py-4 rounded-lg divide-x  flex divide-border">
      <div className="grid gap-2  px-4">
        <p className="font-light text-xs">Company</p>
        <p className="font-bold text-sm">{companyName}</p>
      </div>
      <div className="grid gap-2  px-4">
        <p className="font-light text-xs">Project</p>
        <p className="font-bold text-sm">{details}</p>
      </div>
    </div>
  );
}

export { CardDetail };
export type { CardDetailProps };
