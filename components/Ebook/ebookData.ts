export type EbookItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
  highlightLabel: string;
  buyLabel: string;
  buyUrl: string;
  lightGradient: string;
  darkGradient: string;
};

export const createEbookItems = (t: (key: string) => string): EbookItem[] => [
  {
    id: "fullstack-design-development",
    badge: t("ebook.items.frontend.badge"),
    title: t("ebook.items.frontend.title"),
    description: t("ebook.items.frontend.description"),
    highlight: t("ebook.items.frontend.highlight"),
    highlightLabel: t("ebook.highlightLabel"),
    buyLabel: t("ebook.items.frontend.cta"),
    buyUrl: "https://maretacodes.myr.id/ebook/ebook-fullstack-design-development",
    lightGradient: "from-amber-400/30 via-transparent to-emerald-400/20",
    darkGradient: "from-amber-300/20 via-transparent to-emerald-300/10",
  },
];
