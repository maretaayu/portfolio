"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useApp } from "../../context/AppContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function CollaborationSection() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  const collaborationItems = useMemo(
    () => [
      {
        title: t("resources.collaboration.mentoring.title"),
        description: t("resources.collaboration.mentoring.desc"),
        ctaLabel: t("resources.collaboration.mentoring.cta"),
        href: "mailto:maretacodes@gmail.com?subject=Mentoring%20Inquiry",
      },
      {
        title: t("resources.collaboration.speaking.title"),
        description: t("resources.collaboration.speaking.desc"),
        ctaLabel: t("resources.collaboration.speaking.cta"),
        href: "mailto:maretacodes@gmail.com?subject=Speaking%20Collaboration",
      },
      {
        title: t("resources.collaboration.projects.title"),
        description: t("resources.collaboration.projects.desc"),
        ctaLabel: t("resources.collaboration.projects.cta"),
        href: "mailto:maretacodes@gmail.com?subject=Project%20Based%20Work%20Inquiry",
      },
    ],
    [t]
  );

  return (
    <section
      id="collaboration"
      className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] transition-colors duration-500 ${
              isDark ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            {t("collaboration.badge")}
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl font-light leading-tight transition-colors duration-500 mt-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("collaboration.title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-lg font-light leading-relaxed transition-colors duration-500 mt-6 max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("collaboration.description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {collaborationItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className={`flex h-full flex-col justify-between rounded-3xl border p-6 transition-colors duration-300 ${
                isDark
                  ? "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="space-y-3">
                <h3
                  className={`text-xl font-light transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
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
              <div className="mt-6">
                <a
                  href={item.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isDark
                      ? "border border-gray-700 text-gray-200 hover:border-gray-500"
                      : "border border-gray-300 text-gray-700 hover:border-gray-500"
                  }`}
                >
                  {item.ctaLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { CollaborationSection };