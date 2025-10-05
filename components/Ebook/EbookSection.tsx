"use client";

import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { createEbookItems, EbookItem } from "./ebookData";
import { EbookCard } from "./EbookCard";

type EbookCard = EbookItem;

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

function EbookSection() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  const ebooks: EbookCard[] = createEbookItems(t);

  return (
    <section
      className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-3xl space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-medium uppercase tracking-widest transition-colors duration-500 ${
              isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-600"
            }`}
          >
            {t("ebook.subtitle")}
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-light leading-tight transition-colors duration-500 ${
              isDark
                ? "text-white"
                : "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
            }`}
          >
            {t("ebook.title")}
          </h2>
          <p
            className={`text-lg font-light leading-relaxed transition-colors duration-500 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("ebook.description")}
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-10 lg:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
        >
          {ebooks.map((ebook) => (
            <motion.div
              key={ebook.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="lg:col-span-4 justify-self-start"
            >
              <EbookCard ebook={ebook} isDark={isDark} className="max-w-md" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { EbookSection };
