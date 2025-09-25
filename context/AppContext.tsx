"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "id";
export type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Translation dictionary
const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.journey": "Journey",
    "nav.work": "Work",
    "nav.stories": "Stories",
    "nav.speaking": "Speaking",
    "nav.contact": "Contact",

    // Hero Section
    "hero.tagline": "Transforming Through Change",
    "hero.description": "Building bridges between design, code, and community.",
    "hero.growth": "Sharing knowledge because growth happens together.",
    "hero.role1": "Software Engineer",
    "hero.role2": "Product Designer",
    "hero.role3": "Content Creator",

    // Journey Section
    "journey.subtitle": "Evolution",
    "journey.title": "The Plot Twists",
    "journey.description":
      "Each career switch was terrifying. Each transition felt impossible.",
    "journey.lesson":
      "But here's what I learned: your seemingly unrelated experiences become your greatest strengths.",
    "journey.chapter1": "Chapter 1",
    "journey.chapter2": "Chapter 2",
    "journey.chapter3": "Chapter 3",
    "journey.current": "Current",
    "journey.marketing": "Senior Marketing Engineer",
    "journey.design": "Senior UI Designer",
    "journey.engineering": "Software Engineer",
    "journey.community": "Community Builder",
    "journey.marketing.subtitle": "Business meets tech",
    "journey.design.subtitle": "Visual storytelling",
    "journey.engineering.subtitle": "Building with code",
    "journey.community.subtitle": "Sharing the journey",
    "journey.marketing.insight":
      "Every campaign needs a solid technical foundation.",
    "journey.design.insight": "Design is empathy made visible.",
    "journey.engineering.insight":
      "Code that impacts millions starts with one student's need.",
    "journey.community.insight": "Growth happens when we learn together.",
    "journey.marketing.story":
      "Built all Ruangguru's marketing landing pages, optimized technical SEO, and managed the company blog. Discovered that marketing and code make magic together.",
    "journey.design.story":
      "Discovered that pixels could tell stories that words couldn't.",
    "journey.engineering.story":
      "Built AiRIS (ai.ruangguru.com) - an AI learning platform used by students across Indonesia. From concept to production, creating tools that make education accessible.",
    "journey.community.story":
      "Turned my career pivots into content that helps others navigate theirs.",
    "journey.ripple": "The Ripple Effect",
    "journey.tiktok": "TikTok Followers",
    "journey.instagram": "Instagram Community",
    "journey.mentees": "Lives Changed",
    "journey.tiktok.desc": "Sharing tech journeys",
    "journey.instagram.desc": "Daily inspiration",
    "journey.mentees.desc": "Through mentorship",

    // Portfolio Section
    "portfolio.subtitle": "Work",
    "portfolio.title": "Impact Areas",
    "portfolio.uiux.title": "UI/UX",
    "portfolio.uiux.desc":
      "Transforming ideas into visually stunning interfaces. Elevating user experiences through intuitive designs that captivate.",
    "portfolio.frontend.title": "Frontend",
    "portfolio.frontend.desc":
      "Crafting smooth, responsive web experiences and adherence to best practices for search visibility.",
    "portfolio.content.title": "Content Creation",
    "portfolio.content.desc":
      "Demystifying tech through engaging storytelling. Creating content that educates and inspires.",

    // Learn/Speaking Section
    "learn.item1.title":
      "Slicing Responsive Personal Website HTML CSS & Deploy to Vercel",
    "learn.item1.desc":
      "Perfect for mastering responsive web design with pure HTML & CSS",
    "learn.item2.title": "Landing Page UI Design Tutorial with Figma",
    "learn.item2.desc":
      "Ideal for those wanting to dive into the complete landing page design process using Figma.",
    "learn.item3.title": "Slicing Landing Page Personal Website - Bootstrap",
    "learn.item3.desc":
      "Great for quickly building responsive websites using the powerful Bootstrap framework.",

    // Contact Section
    "contact.title": "Contact",
    "contact.description":
      "Every question is an opportunity to learn and grow together",
    "contact.button": "Ask Me Anything",

    // Footer
    "footer.copyright": "© 2025 Mareta",
    "footer.instagram": "Instagram",
    "footer.tiktok": "TikTok",
    "footer.email": "Email",
  },
  id: {
    // Header
    "nav.home": "Beranda",
    "nav.journey": "Perjalanan",
    "nav.work": "Karya",
    "nav.stories": "Cerita",
    "nav.speaking": "Berbicara",
    "nav.contact": "Kontak",

    // Hero Section
    "hero.tagline": "Bertransformasi Melalui Perubahan",
    "hero.description":
      "Membangun jembatan antara desain, kode, dan komunitas.",
    "hero.growth":
      "Berbagi pengetahuan karena pertumbuhan terjadi bersama-sama.",
    "hero.role1": "Software Engineer",
    "hero.role2": "Product Designer",
    "hero.role3": "Content Creator",

    // Journey Section
    "journey.subtitle": "Evolusi",
    "journey.title": "Plot Twist Karier",
    "journey.description":
      "Setiap perpindahan karier itu menakutkan. Setiap transisi terasa mustahil.",
    "journey.lesson":
      "Tapi inilah yang aku pelajari: pengalaman yang tampaknya tidak terkait menjadi kekuatan terbesarmu.",
    "journey.chapter1": "Bab 1",
    "journey.chapter2": "Bab 2",
    "journey.chapter3": "Bab 3",
    "journey.current": "Sekarang",
    "journey.marketing": "Senior Marketing Engineer",
    "journey.design": "Senior UI Designer",
    "journey.engineering": "Software Engineer",
    "journey.community": "Community Builder",
    "journey.marketing.subtitle": "Bisnis bertemu teknologi",
    "journey.design.subtitle": "Bercerita melalui visual",
    "journey.engineering.subtitle": "Membangun dengan kode",
    "journey.community.subtitle": "Berbagi perjalanan",
    "journey.marketing.insight":
      "Setiap kampanye butuh fondasi teknis yang solid.",
    "journey.design.insight": "Desain adalah empati yang terlihat.",
    "journey.engineering.insight":
      "Kode yang berdampak jutaan dimulai dari kebutuhan satu siswa.",
    "journey.community.insight":
      "Pertumbuhan terjadi ketika kita belajar bersama.",
    "journey.marketing.story":
      "Membangun semua landing page marketing Ruangguru, optimasi technical SEO, dan mengelola blog perusahaan. Menemukan bahwa marketing dan kode menciptakan keajaiban bersama.",
    "journey.design.story":
      "Menemukan bahwa pixel bisa menceritakan kisah yang tidak bisa diungkapkan kata-kata.",
    "journey.engineering.story":
      "Membangun AiRIS (ai.ruangguru.com) - platform pembelajaran AI yang digunakan siswa di seluruh Indonesia. Dari konsep hingga produksi, menciptakan tools yang membuat pendidikan lebih mudah diakses.",
    "journey.community.story":
      "Mengubah perpindahan karier menjadi konten yang membantu orang lain menavigasi perjalanan mereka.",
    "journey.ripple": "Efek Riak",
    "journey.tiktok": "Pengikut TikTok",
    "journey.instagram": "Komunitas Instagram",
    "journey.mentees": "Hidup yang Berubah",
    "journey.tiktok.desc": "Berbagi perjalanan tech",
    "journey.instagram.desc": "Inspirasi harian",
    "journey.mentees.desc": "Melalui mentoring",

    // Portfolio Section
    "portfolio.subtitle": "Karya",
    "portfolio.title": "Area Dampak",
    "portfolio.uiux.title": "UI/UX",
    "portfolio.uiux.desc":
      "Mengubah ide menjadi antarmuka yang menawan secara visual. Meningkatkan pengalaman pengguna melalui desain intuitif yang memikat.",
    "portfolio.frontend.title": "Frontend",
    "portfolio.frontend.desc":
      "Menciptakan pengalaman web yang mulus dan responsif dengan kepatuhan pada praktik terbaik untuk visibilitas pencarian.",
    "portfolio.content.title": "Content Creation",
    "portfolio.content.desc":
      "Mengungkap misteri teknologi melalui storytelling yang menarik. Menciptakan konten yang mendidik dan menginspirasi.",

    // Learn/Speaking Section
    "learn.item1.title":
      "Slicing Responsive Personal Website HTML CSS & Deploy ke Vercel",
    "learn.item1.desc":
      "Sempurna untuk menguasai desain web responsif dengan HTML & CSS murni",
    "learn.item2.title": "Tutorial UI Design Landing Page dengan Figma",
    "learn.item2.desc":
      "Ideal bagi mereka yang ingin menyelami proses desain landing page lengkap menggunakan Figma.",
    "learn.item3.title": "Slicing Landing Page Personal Website - Bootstrap",
    "learn.item3.desc":
      "Bagus untuk membangun website responsif dengan cepat menggunakan framework Bootstrap yang powerful.",

    // Contact Section
    "contact.title": "Kontak",
    "contact.description":
      "Setiap pertanyaan adalah kesempatan untuk belajar dan tumbuh bersama",
    "contact.button": "Tanya Apa Saja",

    // Footer
    "footer.copyright": "© 2025 Mareta",
    "footer.instagram": "Instagram",
    "footer.tiktok": "TikTok",
    "footer.email": "Email",
  },
};

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  // Load theme and language from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "id" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        toggleLanguage,
        toggleTheme,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
