"use client";

import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

type PortfolioProps = {
  portfolioItems: Array<{
    title: string;
    description: string;
    onClick: () => void;
  }>;
};

function Portfolio({ portfolioItems }: PortfolioProps) {
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      id="portfolio"
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div
            className={`text-sm font-light tracking-widest uppercase mb-4 transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("portfolio.subtitle")}
          </div>
          <h2
            className={`text-5xl font-light mb-8 transition-colors duration-500 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("portfolio.title")}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group cursor-pointer"
              onClick={item.onClick}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`p-8 h-80 flex flex-col items-center justify-center text-center space-y-6 transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 hover:shadow-2xl"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <div className="w-20 h-20">
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full stroke-1 fill-none transition-colors duration-500 ${
                      isDark ? "stroke-white" : "stroke-black"
                    }`}
                  >
                    {index === 0 && (
                      <>
                        <circle cx="50" cy="20" r="6" />
                        <path
                          d="M44,16 Q50,13 56,16 L56,19 Q50,21 44,19 Z"
                          fill="none"
                        />
                        <line x1="50" y1="26" x2="50" y2="50" />
                        <line x1="50" y1="35" x2="35" y2="43" />
                        <line x1="50" y1="35" x2="65" y2="43" />
                        <line x1="50" y1="50" x2="40" y2="70" />
                        <line x1="50" y1="50" x2="60" y2="70" />
                        <path d="M46,45 L54,45 L57,55 L43,55 Z" fill="none" />
                        <circle
                          cx="35"
                          cy="40"
                          r="2"
                          fill={isDark ? "white" : "black"}
                        />
                        <rect x="65" y="38" width="6" height="6" fill="none" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <circle cx="50" cy="20" r="6" />
                        <path
                          d="M44,16 Q50,13 56,16 L56,19 Q50,21 44,19 Z"
                          fill="none"
                        />
                        <line x1="50" y1="26" x2="50" y2="50" />
                        <line x1="50" y1="35" x2="35" y2="43" />
                        <line x1="50" y1="35" x2="65" y2="43" />
                        <line x1="50" y1="50" x2="40" y2="70" />
                        <line x1="50" y1="50" x2="60" y2="70" />
                        <path d="M46,45 L54,45 L57,55 L43,55 Z" fill="none" />
                        <rect
                          x="30"
                          y="30"
                          width="18"
                          height="10"
                          fill="none"
                        />
                        <line x1="32" y1="33" x2="40" y2="33" />
                        <line x1="32" y1="36" x2="36" y2="36" />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <circle cx="50" cy="20" r="6" />
                        <path
                          d="M44,16 Q50,13 56,16 L56,19 Q50,21 44,19 Z"
                          fill="none"
                        />
                        <line x1="50" y1="26" x2="50" y2="50" />
                        <line x1="50" y1="35" x2="35" y2="43" />
                        <line x1="50" y1="35" x2="65" y2="43" />
                        <line x1="50" y1="50" x2="40" y2="70" />
                        <line x1="50" y1="50" x2="60" y2="70" />
                        <path d="M46,45 L54,45 L57,55 L43,55 Z" fill="none" />
                        <circle cx="30" cy="30" r="6" fill="none" />
                        <circle cx="70" cy="30" r="6" fill="none" />
                        <rect x="45" y="25" width="10" height="6" fill="none" />
                      </>
                    )}
                  </svg>
                </div>

                <div className="space-y-3">
                  <h3
                    className={`text-xl font-light transition-colors duration-300 ${
                      isDark
                        ? "text-white group-hover:text-gray-300"
                        : "text-black group-hover:text-gray-600"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm font-light leading-relaxed transition-colors duration-300 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`w-full pt-4 border-t transition-colors duration-300 ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div
                    className={`inline-flex items-center space-x-2 text-xs font-light transition-colors duration-300 ${
                      isDark
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span>Explore</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export { Portfolio };
