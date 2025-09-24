"use client";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

function SectionFooter() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.footer
      className={`border-t py-8 transition-colors duration-500 ${
        isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="max-w-4xl mx-auto px-8 flex justify-between items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className={`text-sm font-light transition-colors duration-500 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
          variants={itemVariants}
        >
          {t("footer.copyright")}
        </motion.div>

        <motion.div className="flex space-x-6" variants={itemVariants}>
          <motion.a
            href="https://www.instagram.com/maretacodes"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-light transition-all duration-300 ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {t("footer.instagram")}
          </motion.a>
          <motion.a
            href="https://www.tiktok.com/@maretacodes"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-light transition-all duration-300 ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {t("footer.tiktok")}
          </motion.a>
          <motion.a
            href="mailto:maretacodes@gmail.com"
            className={`text-sm font-light transition-all duration-300 ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {t("footer.email")}
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}

export { SectionFooter };
