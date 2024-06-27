import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { Button } from "../Button";
import Image from "next/image";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed w-full bg-invert z-10">
      <header className="flex flex-row items-center justify-between page-center p-2  bg-gray-100">
        <Link href="/">
          <Image src="/images/Logo.png" alt="Logo" width={64} height={64} />
        </Link>
        <nav className="hidden md:flex justify-between items-center gap-6 font-semibold">
          <Link href="#journey">Journey</Link>
          <Link href="#portfolio">Portfolio</Link>
          <Link href="#learn">Learn</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <Button
          className="hidden md:flex"
          variant="primary"
          href="mailto:maretacodes@gmail.com"
        >
          Contact me
        </Button>
        <nav className="md:hidden flex flex-col items-end gap-1 font-semibold">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden font-bold text-xl hover:text-gray-500"
          >
            {showMenu ? <GrClose /> : <GiHamburgerMenu />}
          </button>
        </nav>
      </header>
      {showMenu && (
        <div className="flex flex-col page-center gap-4 p-4">
          <Link href="#journey">Journey</Link>
          <Link href="#portfolio">Portfolio</Link>
          <Link href="#learn">Learn</Link>
          <Link href="#contact">Contact</Link>
          <Button
            className="md:hidden"
            variant="primary"
            href="mailto:maretacodes@gmail.com"
          >
            Contact me
          </Button>
        </div>
      )}
    </div>
  );
}

export { Header };
