import Image from "next/image";

function SectionJourney() {
  return (
    <div
      id="journey"
      className="grid md:grid-cols-2 gap-6 items-center page-center md:py-24 py-12"
    >
      <div className="mx-auto">
        <Image
          src="/images/Journey.png"
          width={531}
          height={399}
          alt="Journey"
        />
      </div>
      <div className="grid gap-8">
        <div className="grid gap-4">
          <h2 className="text-ink font-bold md:text-3xl text-xl">
            My Exciting Journey 🤓
          </h2>
          <p className="text-ink font-light md:text-lg text-md">
            Fueled by an insatiable curiosity and a love for learning, my
            journey started with building landing pages using HTML, CSS & JS,
            followed by crafting user experiences in&nbsp;
            <b className="font-bold">UI/UX Design</b>.
            <br />
            <br />
            Now, I thrive as a <b className="font-bold">Software Engineer</b>
            &nbsp; specializing in frontend development. Alongside, I share my
            expertise and experiences as a&nbsp;
            <b className="font-bold">Tech Content Creator</b>
          </p>
        </div>
        <div className="flex gap-12 bg-subtle text-ink rounded-xl w-fit px-6 py-3">
          <div className="grid gap-2">
            <p className="md:text-2xl text-lg">
              <b className="font-bold">27K+</b>
            </p>
            <p className="font-light">TikTok</p>
          </div>
          <div className="grid gap-2">
            <p className="md:text-2xl text-lg">
              <b className="font-bold">11K+</b>
            </p>
            <p className="font-light">Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SectionJourney };
