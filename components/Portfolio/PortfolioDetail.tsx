import { Card } from "../Card";
import type { CardProps } from "../Card";

type PortfolioDetailProps = {
  portfolioItems: CardProps[];
  portfolioTitle: string;
};

function PortfolioDetail({
  portfolioItems,
  portfolioTitle,
}: PortfolioDetailProps) {
  return (
    <section id="portfolio-uiux" className="page-center md:py-32 py-24">
      <h2 className="text-3xl font-bold text-center mb-8">{portfolioTitle}</h2>
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {portfolioItems.map((item, index) => (
          <Card
            key={index}
            banner={item.banner}
            title={item.title}
            buttonLabel={item.buttonLabel}
            description={item.description}
            alt={item.alt}
            onClick={item.onClick}
            withCardDetail={true}
            companyName={item.companyName}
            details={item.details}
          />
        ))}
      </div>
    </section>
  );
}

export { PortfolioDetail };
