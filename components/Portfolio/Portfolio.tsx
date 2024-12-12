import { Card } from "../Card";
import type { CardProps } from "../Card";

type PortfolioProps = {
  portfolioItems: CardProps[];
};

function Portfolio({ portfolioItems }: PortfolioProps) {
  return (
    <section id="portfolio" className="page-center md:py-24 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">My Work</h2>
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        {portfolioItems.map((item, index) => (
          <Card
            key={index}
            banner={item.banner}
            title={item.title}
            description={item.description}
            alt={item.alt}
            onClick={item.onClick}
            onSecondaryClick={item.onSecondaryClick}
          />
        ))}
      </div>
    </section>
  );
}

export { Portfolio };
