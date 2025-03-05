import Image from "next/image";

function SectionJourney() {
  return (
    <div
      id="journey"
      className="grid md:grid-cols-2 gap-6 items-center page-center md:pt-24  py-12"
    >
      <div className="mx-auto">
        <Image
          src="/images/JourneyImage.png"
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
            Starting as a <b className="font-bold">UI/UX Designer</b> and
            evolving into a <b className="font-bold">Frontend Engineer</b>, I’ve
            always been passionate about building seamless, user-friendly
            experiences. With expertise in React, Next.js, and JavaScript, I
            craft high-performance web applications that blend design and
            functionality.
            <br />
            <br />
            Beyond coding, I love sharing knowledge—breaking down frontend and
            UI/UX concepts through content and mentorship. For me, tech is about
            more than just code; it’s about innovation, collaboration, and
            creating meaningful experiences that inspire and empower others. 🚀
          </p>
        </div>
        <div className="flex gap-12 bg-subtle text-ink rounded-xl w-fit px-6 py-3">
          <div className="grid gap-2">
            <p className="md:text-2xl text-lg">
              <b className="font-bold">28K+</b>
            </p>
            <p className="font-light">TikTok</p>
          </div>
          <div className="grid gap-2">
            <p className="md:text-2xl text-lg">
              <b className="font-bold">15K+</b>
            </p>
            <p className="font-light">Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SectionJourney };
