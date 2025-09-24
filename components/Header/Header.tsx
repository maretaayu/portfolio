"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

type NavItem = {
  href: string;
  labelKey: string;
};

function Header() {
  const [activeSection, setActiveSection] = useState<string>("/");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { language, theme, toggleLanguage, toggleTheme, t } = useApp();

  const navItems: NavItem[] = [
    { href: "/", labelKey: "nav.home" },
    { href: "#journey", labelKey: "nav.journey" },
    { href: "#portfolio", labelKey: "nav.work" },
    { href: "#class", labelKey: "nav.speaking" },
    { href: "#contact", labelKey: "nav.contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navItems.map((item) => item.href.replace("#", ""));

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
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800' 
            : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <nav className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className={`text-xl font-light transition-colors duration-300 ${
            isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'
          }`}>
            Mareta
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-light transition-all duration-300 hover:scale-105 ${
                  activeSection === item.href 
                    ? isDark ? "text-white" : "text-black"
                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "EN" : "ID"}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-black'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.div 
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                />
                <motion.div 
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                />
                <motion.div 
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden mt-4 py-4 border-t ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-light transition-colors duration-300 ${
                      activeSection === item.href 
                        ? isDark ? "text-white" : "text-black"
                        : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { Header };