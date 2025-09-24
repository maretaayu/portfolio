"use client";
import { useApp } from "../../context/AppContext";

function SectionContact() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <div className="w-24 h-24 mx-auto">
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full stroke-2 fill-none transition-colors duration-500 ${
              isDark ? "stroke-white" : "stroke-black"
            }`}
          >
            <circle cx="50" cy="20" r="6" />
            <line x1="50" y1="26" x2="50" y2="55" />
            <line x1="50" y1="35" x2="35" y2="45" />
            <line x1="50" y1="35" x2="65" y2="45" />
            <line x1="50" y1="55" x2="35" y2="75" />
            <line x1="50" y1="55" x2="65" y2="75" />
            <circle cx="30" cy="15" r="8" fill="none" />
            <line x1="26" y1="12" x2="30" y2="15" />
            <line x1="30" y1="15" x2="34" y2="18" />
            <circle cx="70" cy="15" r="8" fill="none" />
            <line x1="66" y1="12" x2="70" y2="15" />
            <line x1="70" y1="15" x2="74" y2="18" />
          </svg>
        </div>

        <div className="space-y-8">
          <h2
            className={`text-4xl font-light transition-colors duration-500 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("contact.title")}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("contact.description")}
          </p>

          <a
            href="mailto:maretacodes@gmail.com"
            className={`inline-block px-8 py-3 border font-light transition-all duration-300 ${
              isDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            {t("contact.button")}
          </a>
        </div>
      </div>
    </div>
  );
}

export { SectionContact };
