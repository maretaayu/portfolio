"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useApp } from "../../context/AppContext";

function SectionJourney() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme, t } = useApp();
  const isDark = theme === "dark";

  const chapters = [
    {
      number: "01",
      labelKey: "journey.chapter1",
      titleKey: "journey.marketing",
      subtitleKey: "journey.marketing.subtitle",
      insightKey: "journey.marketing.insight",
      storyKey: "journey.marketing.story",
      skills: ["HTML/CSS", "Technical SEO", "Landing Pages"],
      duration: "2019-2021",
    },
    {
      number: "02",
      labelKey: "journey.chapter2",
      titleKey: "journey.design",
      subtitleKey: "journey.design.subtitle",
      insightKey: "journey.design.insight",
      storyKey: "journey.design.story",
      skills: ["User Research", "Prototyping", "Visual Design"],
      duration: "2021-2023",
    },
    {
      number: "03",
      labelKey: "journey.chapter3",
      titleKey: "journey.engineering",
      subtitleKey: "journey.engineering.subtitle",
      insightKey: "journey.engineering.insight",
      storyKey: "journey.engineering.story",
      skills: ["React", "AI Integration", "EdTech"],
      duration: "2023-Present",
    },
    {
      number: "04",
      labelKey: "journey.current",
      titleKey: "journey.community",
      subtitleKey: "journey.community.subtitle",
      insightKey: "journey.community.insight",
      storyKey: "journey.community.story",
      skills: ["Content Creation", "Mentorship", "Speaking"],
      duration: "2023-Present",
    },
  ];

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

  const chapterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        bounce: 0.4,
      },
    },
  };

  const timelineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 2,
        delay: 1,
        type: "spring" as const,
        bounce: 0.2,
      },
    },
  };

  return (
    <div
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            {t("journey.subtitle")}
          </div>
          <h2
            className={`text-6xl font-light mb-8 transition-colors duration-500 ${
              isDark
                ? "bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
                : "bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent"
            }`}
          >
            {t("journey.title")}
          </h2>
          <p
            className={`text-xl font-light max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("journey.description")}
            <br />
            <span
              className={`font-normal transition-colors duration-500 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {t("journey.lesson")}
            </span>
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className={`absolute top-32 left-0 right-0 h-0.5 transform origin-left transition-colors duration-500 ${
              isDark
                ? "bg-gradient-to-r from-gray-700 via-white to-gray-700"
                : "bg-gradient-to-r from-gray-200 via-black to-gray-200"
            }`}
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          {/* Chapters Grid */}
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {chapters.map((chapter, index) => (
              <motion.div
                key={index}
                variants={chapterVariants}
                className={`relative cursor-pointer group ${
                  activeChapter === index ? "transform scale-105" : ""
                }`}
                onHoverStart={() => setActiveChapter(index)}
                onHoverEnd={() => setActiveChapter(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-500 ${
                    isDark
                      ? "border-gray-800 bg-white"
                      : "border-white bg-black"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Chapter Card */}
                <div
                  className={`rounded-2xl p-8 shadow-lg border transition-all duration-500 ${
                    isDark
                      ? activeChapter === index
                        ? "shadow-2xl border-white bg-white text-black"
                        : "bg-gray-800 border-gray-700 text-white group-hover:shadow-xl group-hover:border-gray-600"
                      : activeChapter === index
                      ? "shadow-2xl border-black bg-black text-white"
                      : "bg-white border-gray-100 text-black group-hover:shadow-xl group-hover:border-gray-300"
                  }`}
                >
                  {/* Chapter Number */}
                  <div
                    className={`text-6xl font-light mb-4 transition-colors duration-500 ${
                      isDark
                        ? activeChapter === index
                          ? "text-black"
                          : "text-gray-600"
                        : activeChapter === index
                        ? "text-white"
                        : "text-gray-200"
                    }`}
                  >
                    {chapter.number}
                  </div>

                  {/* Chapter Info */}
                  <div className="space-y-4 mb-6">
                    <div
                      className={`text-xs font-light tracking-widest uppercase transition-colors duration-500 ${
                        isDark
                          ? activeChapter === index
                            ? "text-gray-600"
                            : "text-gray-400"
                          : activeChapter === index
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {t(chapter.labelKey)} • {chapter.duration}
                    </div>
                    <h3
                      className={`text-xl font-light leading-tight transition-colors duration-500 ${
                        isDark
                          ? activeChapter === index
                            ? "text-black"
                            : "text-white"
                          : activeChapter === index
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {t(chapter.titleKey)}
                    </h3>
                    <div
                      className={`w-12 h-px transition-colors duration-500 ${
                        isDark
                          ? activeChapter === index
                            ? "bg-black"
                            : "bg-gray-600"
                          : activeChapter === index
                          ? "bg-white"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>

                  {/* Stickman Icon */}
                  <div className="w-16 h-16 mx-auto mb-6">
                    <svg
                      viewBox="0 0 100 100"
                      className={`w-full h-full stroke-1 fill-none transition-colors duration-500 ${
                        isDark
                          ? activeChapter === index
                            ? "stroke-black"
                            : "stroke-white"
                          : activeChapter === index
                          ? "stroke-white"
                          : "stroke-black"
                      }`}
                    >
                      {/* Face */}
                      <circle cx="50" cy="20" r="6" />

                      {/* Simple bob haircut */}
                      <path
                        d="M44,16 Q50,13 56,16 L56,19 Q50,21 44,19 Z"
                        fill="none"
                      />

                      {/* Body */}
                      <line x1="50" y1="26" x2="50" y2="50" />
                      <line x1="50" y1="35" x2="35" y2="43" />
                      <line x1="50" y1="35" x2="65" y2="43" />
                      <line x1="50" y1="50" x2="40" y2="70" />
                      <line x1="50" y1="50" x2="60" y2="70" />

                      {/* Simple triangular dress */}
                      <path d="M46,45 L54,45 L57,55 L43,55 Z" fill="none" />

                      {/* Custom icons for each chapter */}
                      {index === 0 && (
                        <>
                          {/* Marketing tools */}
                          <rect
                            x="25"
                            y="30"
                            width="15"
                            height="10"
                            fill="none"
                          />
                          <circle cx="70" cy="35" r="3" fill="none" />
                          <path d="M67,32 L70,35 L67,38" fill="none" />
                        </>
                      )}
                      {index === 1 && (
                        <>
                          {/* Design tools */}
                          <rect
                            x="25"
                            y="30"
                            width="12"
                            height="12"
                            fill="none"
                          />
                          <circle
                            cx="31"
                            cy="36"
                            r="1.5"
                            className={
                              activeChapter === index
                                ? "fill-white"
                                : "fill-black"
                            }
                          />
                          <path d="M70,30 L75,35 L70,40 L65,35 Z" fill="none" />
                        </>
                      )}
                      {index === 2 && (
                        <>
                          {/* Coding */}
                          <rect
                            x="25"
                            y="28"
                            width="20"
                            height="15"
                            fill="none"
                          />
                          <text
                            x="27"
                            y="38"
                            fontSize="4"
                            className={
                              activeChapter === index
                                ? "fill-white"
                                : "fill-black"
                            }
                          >
                            &lt;/&gt;
                          </text>
                          <circle cx="70" cy="35" r="2" fill="none" />
                        </>
                      )}
                      {index === 3 && (
                        <>
                          {/* Community building */}
                          <circle cx="35" cy="30" r="3" fill="none" />
                          <circle cx="65" cy="30" r="3" fill="none" />
                          <circle cx="30" cy="40" r="2" fill="none" />
                          <circle cx="70" cy="40" r="2" fill="none" />
                          <line x1="35" y1="30" x2="50" y2="20" />
                          <line x1="65" y1="30" x2="50" y2="20" />
                          <line x1="30" y1="40" x2="35" y2="30" />
                          <line x1="70" y1="40" x2="65" y2="30" />
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Subtitle */}
                  <p
                    className={`text-sm font-light mb-4 transition-colors duration-500 ${
                      isDark
                        ? activeChapter === index
                          ? "text-gray-600"
                          : "text-gray-300"
                        : activeChapter === index
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {t(chapter.subtitleKey)}
                  </p>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeChapter === index ? "auto" : 0,
                      opacity: activeChapter === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <blockquote className="text-sm italic text-gray-300 leading-relaxed">
                        {t(chapter.insightKey)}
                      </blockquote>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t(chapter.storyKey)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {chapter.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Impact Numbers */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <div
            className={`rounded-3xl p-12 transition-colors duration-500 ${
              isDark ? "bg-gray-800 text-white" : "bg-black text-white"
            }`}
          >
            <h3
              className={`text-2xl font-light mb-8 transition-colors duration-500 ${
                isDark ? "text-gray-200" : "text-gray-300"
              }`}
            >
              {t("journey.ripple")}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                <div className="text-4xl font-light">28K+</div>
                <div
                  className={`text-sm transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  {t("journey.tiktok")}
                </div>
                <div
                  className={`text-xs transition-colors duration-500 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {t("journey.tiktok.desc")}
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                <div className="text-4xl font-light">15K+</div>
                <div
                  className={`text-sm transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  {t("journey.instagram")}
                </div>
                <div
                  className={`text-xs transition-colors duration-500 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {t("journey.instagram.desc")}
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
                <div className="text-4xl font-light">100+</div>
                <div
                  className={`text-sm transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-gray-400"
                  }`}
                >
                  {t("journey.mentees")}
                </div>
                <div
                  className={`text-xs transition-colors duration-500 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {t("journey.mentees.desc")}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export { SectionJourney };
