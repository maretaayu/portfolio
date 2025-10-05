"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { useApp } from "../../context/AppContext";
import { createEbookItems } from "../Ebook/ebookData";
import { EbookCard } from "../Ebook/EbookCard";

const TAB_ORDER = ["tutorials", "ebooks", "collaboration"] as const;

type TabId = (typeof TAB_ORDER)[number];

const isValidTab = (value: unknown): value is TabId =>
  typeof value === "string" && TAB_ORDER.includes(value as TabId);

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const tutorialThumbnailSize = 224;

export function ResourcesSection() {
  const { t, theme } = useApp();
  const isDark = theme === "dark";
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("tutorials");

  const tutorials = useMemo(
    () => [
      {
        title: t("learn.item1.title"),
        description: t("learn.item1.desc"),
        url: "https://www.youtube.com/watch?v=BSHd1tLAJog",
        thumbnail: "https://img.youtube.com/vi/BSHd1tLAJog/hqdefault.jpg",
      },
      {
        title: t("learn.item2.title"),
        description: t("learn.item2.desc"),
        url: "https://www.youtube.com/watch?v=1ZGgcCYmvYU",
        thumbnail: "https://img.youtube.com/vi/1ZGgcCYmvYU/hqdefault.jpg",
      },
      {
        title: t("learn.item3.title"),
        description: t("learn.item3.desc"),
        url: "https://www.youtube.com/watch?v=-2kg-8ns8oE",
        thumbnail: "https://img.youtube.com/vi/-2kg-8ns8oE/hqdefault.jpg",
      },
    ],
    [t]
  );

  const ebooks = useMemo(() => createEbookItems(t), [t]);

  const collaboration = useMemo(
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
    ],
    [t]
  );

  useEffect(() => {
    const tab = Array.isArray(router.query.tab)
      ? router.query.tab[0]
      : router.query.tab;
    if (isValidTab(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("tutorials");
    }
  }, [router.query.tab]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);

    const nextQuery = { ...router.query };
    if (tab === "tutorials") {
      delete nextQuery.tab;
    } else {
      nextQuery.tab = tab;
    }

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
        hash: "resources",
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section
      id="resources"
      className={`py-24 transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-3xl space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] transition-colors duration-500 ${
              isDark ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            {t("resources.badge")}
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-light leading-tight transition-colors duration-500 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("resources.title")}
          </h2>
          <p
            className={`text-base sm:text-lg font-light leading-relaxed transition-colors duration-500 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("resources.description")}
          </p>
        </motion.div>

        <div className="mt-12">
          <div
            className={`inline-flex rounded-full border p-1 text-sm transition-colors duration-300 ${
              isDark
                ? "border-gray-800 bg-gray-900/70"
                : "border-gray-200 bg-gray-100"
            }`}
          >
            {TAB_ORDER.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`relative rounded-full px-4 py-2 font-light transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? "bg-gray-light text-gray-dark shadow"
                        : "bg-gray-dark text-gray-light shadow"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {t(`nav.resources.${tab}`)}
                </button>
              );
            })}
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              {activeTab === "tutorials" && (
                <motion.div
                  key="tutorials"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {tutorials.map((item) => (
                    <motion.article
                      key={item.url}
                      variants={listItemVariants}
                      className={`flex flex-col rounded-3xl border p-6 transition-colors duration-300 ${
                        isDark
                          ? "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="mb-4">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={tutorialThumbnailSize}
                          height={tutorialThumbnailSize * 0.5625}
                          className="h-32 w-full rounded-2xl object-cover shadow-md"
                          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 25rem, 100vw"
                        />
                      </div>
                      <div className="flex flex-col space-y-3 flex-1">
                        <h3
                          className={`text-lg font-light transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-sm font-light leading-relaxed transition-colors duration-300 flex-1 ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </p>
                        <div className="mt-auto">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] transition-colors duration-200 ${
                              isDark
                                ? "border border-gray-700 text-gray-200 hover:border-gray-500"
                                : "border border-gray-300 text-gray-700 hover:border-gray-500"
                            }`}
                          >
                            {t("resources.tabs.tutorials.cta")}
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {activeTab === "ebooks" && (
                <motion.div
                  key="ebooks"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-8 md:grid-cols-2"
                >
                  {ebooks.map((ebook) => (
                    <EbookCard
                      key={ebook.id}
                      ebook={ebook}
                      isDark={isDark}
                      className="max-w-md"
                    />
                  ))}
                </motion.div>
              )}

              {activeTab === "collaboration" && (
                <motion.div
                  key="collaboration"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-6 md:grid-cols-2"
                >
                  {collaboration.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={listItemVariants}
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
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
