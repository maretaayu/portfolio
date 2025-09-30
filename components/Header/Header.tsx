"use client";
import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

type NavItem = {
  href: string;
  labelKey: string;
};

const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "#journey", labelKey: "nav.journey" },
  { href: "#portfolio", labelKey: "nav.work" },
  { href: "/story", labelKey: "nav.stories" },
  { href: "#class", labelKey: "nav.speaking" },
  { href: "#contact", labelKey: "nav.contact" },
];

function Header() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("/");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { language, theme, toggleLanguage, toggleTheme, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (router.pathname !== "/") return;
      const scrollPosition = window.scrollY;

      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.replace("#", ""));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "") continue;

        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection("#" + section);
          break;
        }
      }

      if (scrollPosition < 100) {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = router.asPath.split("#")[1];
    if (!hash) return;

    const timeout = window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (!element) return;

      const yOffset = 80;
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setActiveSection(`#${hash}`);
    }, 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [router.asPath]);

  useEffect(() => {
    if (router.asPath.includes("#")) return;
    setActiveSection(router.pathname === "/" ? "/" : router.pathname);
  }, [router.pathname, router.asPath]);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      event.preventDefault();
      const targetId = href.substring(1);

      if (router.pathname !== "/") {
        setActiveSection(href);
        void router.push({ pathname: "/", hash: targetId });
        setIsMenuOpen(false);
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = 80;
        const targetPosition =
          element.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        setActiveSection(href);
      }

      setIsMenuOpen(false);
      return;
    }

    setActiveSection(href);
    if (href === router.pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800"
            : "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <nav className="flex justify-between items-center h-12 sm:h-auto">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg sm:text-xl font-light transition-colors duration-300 ${
              isDark
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
            }`}
          >
            Mareta
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`text-sm font-light transition-all duration-300 hover:scale-105 ${
                  activeSection === item.href
                    ? isDark
                      ? "text-white"
                      : "text-black"
                    : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4 sm:pr-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`text-xs font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-300 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "EN" : "ID"}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button - Always visible on small screens */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex md:hidden items-center justify-center transition-all duration-300 ${
                isDark
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                // X Close Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Menu Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Mobile Menu Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm md:hidden z-30"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Mobile Menu Content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden mt-6 py-6 border-t rounded-b-xl shadow-2xl relative z-40 ${
                  isDark
                    ? "border-gray-700 bg-gray-900 backdrop-blur-md"
                    : "border-gray-200 bg-white backdrop-blur-md"
                }`}
              >
                <div className="flex flex-col space-y-6 px-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.href)}
                        className={`block text-base font-light py-2 px-4 rounded-lg transition-all duration-300 ${
                          activeSection === item.href
                            ? isDark
                              ? "text-white bg-gray-700"
                              : "text-black bg-gray-100"
                            : isDark
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : "text-gray-600 hover:text-black hover:bg-gray-100"
                        }`}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { Header };
