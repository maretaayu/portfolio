"use client";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

function Hero() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 pt-16 sm:pt-20 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-12" variants={itemVariants}>
          <div className="space-y-6">
            <motion.div
              className={`text-xs sm:text-sm font-light tracking-widest uppercase transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
              variants={itemVariants}
            >
              {t("hero.tagline")}
            </motion.div>
            <motion.h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none transition-colors duration-500 ${
                isDark ? "text-white" : "text-black"
              }`}
              variants={itemVariants}
            >
              Mareta
            </motion.h1>
            <motion.div
              className={`w-20 h-px transition-colors duration-500 ${
                isDark ? "bg-white" : "bg-black"
              }`}
              variants={itemVariants}
            ></motion.div>
          </div>

          <motion.p
            className={`text-lg sm:text-xl font-light leading-relaxed max-w-lg transition-colors duration-500 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            variants={itemVariants}
          >
            {t("hero.description")}
            <span
              className={`font-normal transition-colors duration-500 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {t("hero.growth")}
            </span>
          </motion.p>

          <motion.div
            className={`flex flex-col sm:flex-row gap-2 sm:gap-8 text-sm font-light transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
            variants={itemVariants}
          >
            <div>{t("hero.role1")}</div>
            <div>{t("hero.role2")}</div>
            <div>{t("hero.role3")}</div>
          </motion.div>
        </motion.div>

        <motion.div className="relative" variants={floatVariants}>
          <div className="w-full max-w-xl mx-auto">
            <video
              className="w-full rounded-3xl object-cover"
              src="/images/Animated_Hijabi_Coder_Presentation_Ideas.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export { Hero };
