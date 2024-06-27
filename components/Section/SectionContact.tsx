import { Button } from "../Button";

function SectionContact() {
  return (
    <section id="contact" className="section-contact">
      <div className="page-center text-center flex gap-6 flex-col items-center">
        <h2 className="text-ink font-bold md:text-3xl text-xl mt-4 w-6/12">
          Every question is an opportunity to learn and grow together
        </h2>
        <Button
          className="w-fit"
          variant="primary"
          href="mailto:maretacodes@gmail.com"
        >
          Ask Me Anything
        </Button>
      </div>
    </section>
  );
}

export { SectionContact };
