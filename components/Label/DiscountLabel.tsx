type DiscountLabelProps = {
  label: string;
};

function DiscountLabel({ label }: DiscountLabelProps) {
  return (
    <div className="bg-lightRed  p-2 rounded-md w-fit">
      <p className="text-red text-sm font-bold">{label}</p>
    </div>
  );
}

export { DiscountLabel };
