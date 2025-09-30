"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

type SpeakingProps = {
  speakingItems: Array<{
    title: string;
    description: string;
    type: string;
    audience?: string;
    url?: string;
    thumbnail?: string;
  }>;
};

function Learn({ speakingItems }: SpeakingProps) {
  const { theme } = useApp();
  const isDark = theme === "dark";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      id="class"
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
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
            Learn
          </div>
          <h2
            className={`text-5xl font-light mb-8 transition-colors duration-500 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Tutorials
          </h2>
        </motion.div>

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {speakingItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group cursor-pointer border-b pb-12 last:border-b-0 transition-colors duration-500 ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
              onClick={() => item.url && window.open(item.url, "_blank")}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
                <div className="flex justify-center md:justify-start">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={448}
                      height={256}
                      className="w-56 h-32 rounded-3xl object-cover shadow-md"
                      sizes="(min-width: 768px) 14rem, 100vw"
                    />
                  ) : (
                    <div className="w-56 h-32">
                      <svg
                        viewBox="0 0 100 100"
                        className={`w-full h-full stroke-1 fill-none transition-colors duration-500 ${
                          isDark ? "stroke-white" : "stroke-black"
                        }`}
                      >
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
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-center md:text-left">
                  <div
                    className={`text-xs font-light tracking-widest uppercase transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.type}
                  </div>
                  <h3
                    className={`text-2xl font-light transition-colors duration-300 ${
                      isDark
                        ? "text-white group-hover:text-gray-300"
                        : "text-black group-hover:text-gray-600"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-base font-light leading-relaxed transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <div className="space-y-2">
                    <div
                      className={`text-sm font-light transition-colors duration-500 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {item.audience}
                    </div>
                    <div
                      className={`inline-flex items-center space-x-2 text-xs font-light transition-colors duration-300 ${
                        isDark
                          ? "text-gray-500 group-hover:text-white"
                          : "text-gray-400 group-hover:text-black"
                      }`}
                    >
                      <span>Watch</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
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

export { Learn };
