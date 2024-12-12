import { DiscountLabel } from "../Label";

type CardPriceProps = {
  basePrice?: number;
  finalPrice?: number;
  sessionPrice?: number;
};

// Utility function for formatting currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function CardPrice({ basePrice, finalPrice, sessionPrice }: CardPriceProps) {
  return (
    <div className="flex gap-2 items-center p-3 bg-subtle rounded-lg ">
      <DiscountLabel label="20%" />
      <div>
        <div className="flex gap-2 ">
          <p className="font-bold text-ink line-through">
            {formatCurrency(basePrice || 1000000)}
          </p>
          <p className="font-bold text-red">
            {formatCurrency(finalPrice || 1000000)}
          </p>
        </div>
        <p className="text-ink font-light text-sm">
          Hanya {formatCurrency(sessionPrice || 150000)}/sesi
        </p>
      </div>
    </div>
  );
}

export { CardPrice };
