import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/16/solid";

function Header() {
  const [activeSection, setActiveSection] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#journey", icon: BriefcaseIcon, label: "Journey" },
    { href: "#portfolio", icon: ComputerDesktopIcon, label: "Portfolio" },
    { href: "#learn", icon: BoltIcon, label: "Learn" },
    {
      href: "#contact",
      icon: ChatBubbleOvalLeftEllipsisIcon,
      label: "Contact",
    },
  ];

  return (
    <div className="mt-4 bottom-4 md:top-0 fixed mx-auto w-full z-10 h-fit">
      <nav
        className={`flex bg-invert justify-center m-auto items-center gap-8 font-semibold py-4 px-8 rounded-full w-fit ${
          isScrolled ? "shadow-neutral" : ""
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setActiveSection(item.href)}
          >
            <div className="flex items-center flex-col gap-1">
              <item.icon
                className={`h-6 w-6 md:hidden ${
                  activeSection === item.href
                    ? "text-pink"
                    : "text-gray opacity-6"
                }`}
              />
              <p
                className={`text-xs md:text-lg ${
                  activeSection === item.href
                    ? "text-pink"
                    : "text-gray opacity-6"
                }`}
              >
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export { Header };
