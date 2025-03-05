import { Card } from "../Card";
import type { CardProps } from "../Card";

type LearnProps = {
  LearnItems: CardProps[];
};

function Learn({ LearnItems }: LearnProps) {
  return (
    <section id="class" className="page-center md:py-24 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Learn with Mareta</h2>
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        {LearnItems.map((item, index) => (
          <Card
            key={index}
            banner={item.banner}
            title={item.title}
            description={item.description}
            alt={item.alt}
            onClick={item.onClick}
            onSecondaryClick={item.onSecondaryClick}
            withPriceList={item.withPriceList}
            basePrice={item.basePrice}
            finalPrice={item.finalPrice}
            sessionPrice={item.sessionPrice}
            buttonLabel={item.buttonLabel}
          />
        ))}
      </div>
    </section>
  );
}

export { Learn };
