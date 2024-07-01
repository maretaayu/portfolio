import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/16/solid";

// Definisikan tipe untuk item navigasi
type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

function Header() {
  const [activeSection, setActiveSection] = useState<string>("/");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navItems: NavItem[] = [
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navItems.map((item) => item.href.replace("#", ""));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "") continue; // Skip the home section

        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection("#" + section);
          break;
        }
      }

      // Check if we're at the top of the page
      if (scrollPosition < 100) {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mt-4 bottom-4 md:top-0 fixed mx-auto w-full z-10 h-fit">
      <nav
        className={`flex bg-invert justify-center m-auto items-center gap-8 font-semibold py-4 px-8 rounded-full w-fit ${
          isScrolled ? "shadow-neutral" : ""
        }`}
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center flex-col gap-1">
              <item.icon
                className={`h-6 w-6 md:hidden ${
                  activeSection === item.href ? "text-pink" : "text-gray"
                }`}
              />
              <p
                className={`text-xs md:text-lg ${
                  activeSection === item.href ? "text-pink" : "text-gray"
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
