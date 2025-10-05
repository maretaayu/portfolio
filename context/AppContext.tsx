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
    "nav.resources": "Resources",
    "nav.resources.tutorials": "Tutorials",
    "nav.resources.ebooks": "E-books",
    "nav.stories": "Stories",
    "nav.collaboration": "Collaboration",

    // Hero Section
    "hero.tagline": "Transforming Through Change",
    "hero.description": "Building bridges between design, code, and storytelling.",
    "hero.growth": "Sharing what I'm learning as it unfolds.",
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
    "journey.community": "Content Creator",
    "journey.marketing.subtitle": "Business meets tech",
    "journey.design.subtitle": "Designing learning experiences",
    "journey.engineering.subtitle": "Building with code",
    "journey.community.subtitle": "Documenting the learning",
    "journey.marketing.insight":
      "Every campaign needs a solid technical foundation.",
    "journey.design.insight":
      "Consistent systems keep every class experience intentional.",
    "journey.engineering.insight":
      "Code that impacts millions starts with one student's need.",
    "journey.community.insight":
      "Publishing in-progress thoughts keeps learning honest.",
    "journey.marketing.story":
      "Built all Ruangguru's marketing landing pages, optimized technical SEO, and managed the company blog. Discovered that marketing and code make magic together.",
    "journey.design.story":
      "Designed Brain Academy, English Academy, and Ruangguru Live, cared for the design system, and reviewed fellow designers' work.",
    "journey.engineering.story":
      "Built AiRIS (ai.ruangguru.com) - an AI learning platform used by students across Indonesia. From concept to production, creating tools that make education accessible.",
    "journey.community.story":
      "Turned every experiment into tutorials, posts, and notes so others can learn in real time.",

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
      "Guided walkthrough for designers crafting end-to-end landing pages in Figma.",
    "learn.item3.title": "Slicing Landing Page Personal Website - Bootstrap",
    "learn.item3.desc":
      "Great for quickly building responsive websites using the powerful Bootstrap framework.",

    // Ebook Section
    "ebook.subtitle": "Digital products",
    "ebook.title": "Build and Ship Web Products with Confidence",
    "ebook.description":
      "Collection of digital playbooks exploring frontend engineering, design systems, workflow automation, and other topics I'm currently documenting.",
    "ebook.featuresTitle": "You'll unlock",
    "ebook.bonusTitle": "Bonus files",
    "ebook.highlightLabel": "Best for",
    "ebook.oneTimePurchase": "One-time purchase",
    "ebook.checkoutNote": "Instant download. Secure checkout via Mayar.",

    "ebook.items.frontend.badge": "Fresh drop",
    "ebook.items.frontend.title": "Fullstack Design & Development Playbook",
    "ebook.items.frontend.description":
      "Practical handbook covering HTML, CSS, JavaScript, React, responsive design, backend integration, Git, and UI/UX fundamentals.",
    "ebook.items.frontend.highlight":
      "Design-forward builders and career switchers who want a clear roadmap from layout to production-ready app.",
    "ebook.items.frontend.price": "IDR 35K",
    "ebook.items.frontend.cta": "Buy on Mayar - IDR 35K",
    "ebook.items.frontend.secondaryCta": "Ask a question",
    "ebook.items.frontend.features.0":
      "HTML, CSS, and JavaScript fundamentals broken down with hands-on exercises and best practices.",
    "ebook.items.frontend.features.1":
      "React.js essentials: Virtual DOM, JSX, components, props, state, list rendering, and spinning up projects with Vite.",
    "ebook.items.frontend.features.2":
      "Responsive layouts with Tailwind CSS plus backend integration using Fetch or Axios and resilient error handling.",
    "ebook.items.frontend.bonuses.0":
      "Git workflow cheatsheet from init to deploying a project with Vercel.",
    "ebook.items.frontend.bonuses.1":
      "Figma Auto Layout templates, UI kit starter, and high-fidelity design tips for consistent UI/UX.",

    // Resources Section
    "resources.badge": "Resources",
    "resources.title": "Learn or team up",
    "resources.description":
      "Tutorials and e-books to grow your skills in frontend engineering and design.",
    "resources.tabs.tutorials.badge": "YouTube",
    "resources.tabs.tutorials.cta": "Watch tutorial",
    "resources.collaboration.mentoring.title": "Mentoring & code reviews",
    "resources.collaboration.mentoring.desc":
      "One-on-one sessions to unblock projects, refine portfolios, or plan a learning roadmap together.",
    "resources.collaboration.mentoring.cta": "Request mentoring",
    "resources.collaboration.speaking.title": "Workshops & collaborations",
    "resources.collaboration.speaking.desc":
      "Invite me to guest speak, co-host live sessions, or partner on community classes and events.",
    "resources.collaboration.speaking.cta": "Discuss an event",
    "resources.collaboration.projects.title": "Project-based services",
    "resources.collaboration.projects.desc":
      "End-to-end product development consulting from design to frontend implementation for your business needs.",
    "resources.collaboration.projects.cta": "Discuss a project",

    // Collaboration Section
    "collaboration.badge": "Collaboration",
    "collaboration.title": "Let's work together",
    "collaboration.description":
      "Ready to collaborate? Choose how we can work together to bring your ideas to life.",

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
    "nav.resources": "Resource",
    "nav.resources.tutorials": "Tutorial",
    "nav.resources.ebooks": "E-book",
    "nav.stories": "Cerita",
    "nav.collaboration": "Kolaborasi",

    // Hero Section
    "hero.tagline": "Bertransformasi Melalui Perubahan",
    "hero.description":
      "Membangun jembatan antara desain, kode, dan storytelling.",
    "hero.growth":
      "Membagikan apa yang kupelajari saat itu juga.",
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
    "journey.community": "Content Creator",
    "journey.marketing.subtitle": "Bisnis bertemu teknologi",
    "journey.design.subtitle": "Merancang pengalaman belajar",
    "journey.engineering.subtitle": "Membangun dengan kode",
    "journey.community.subtitle": "Mendokumentasikan proses belajar",
    "journey.marketing.insight":
      "Setiap kampanye butuh fondasi teknis yang solid.",
    "journey.design.insight":
      "Sistem desain menjaga setiap kelas terasa dirancang dengan niat.",
    "journey.engineering.insight":
      "Kode yang berdampak jutaan dimulai dari kebutuhan satu siswa.",
    "journey.community.insight":
      "Membagikan progres membuat proses belajarku lebih jujur.",
    "journey.marketing.story":
      "Membangun semua landing page marketing Ruangguru, optimasi technical SEO, dan mengelola blog perusahaan. Menemukan bahwa marketing dan kode menciptakan keajaiban bersama.",
    "journey.design.story":
      "Menggarap Brain Academy, English Academy, dan Ruangguru Live, merawat design system, serta mereview karya desainer lain.",
    "journey.engineering.story":
      "Membangun AiRIS (ai.ruangguru.com) - platform pembelajaran AI yang digunakan siswa di seluruh Indonesia. Dari konsep hingga produksi, menciptakan tools yang membuat pendidikan lebih mudah diakses.",
    "journey.community.story":
      "Setiap eksperimen diubah jadi tutorial, catatan, dan konten agar orang lain bisa belajar secara real-time.",

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
      "Panduan menyeluruh bagi desainer untuk merancang landing page end-to-end di Figma.",
    "learn.item3.title": "Slicing Landing Page Personal Website - Bootstrap",
    "learn.item3.desc":
      "Bagus untuk membangun website responsif dengan cepat menggunakan framework Bootstrap yang powerful.",

    // Ebook Section
    "ebook.subtitle": "Produk digital",
    "ebook.title": "Bangun & Rilis Produk Web dengan Pede",
    "ebook.description":
      "Kumpulan playbook digital yang membahas frontend engineering, sistem desain, automasi workflow, dan topik lain yang sedang kudokumentasikan.",
    "ebook.featuresTitle": "Yang akan kamu kuasai",
    "ebook.bonusTitle": "Bonus file",
    "ebook.highlightLabel": "Paling cocok untuk",
    "ebook.oneTimePurchase": "Bayar sekali",
    "ebook.checkoutNote": "Unduh langsung. Pembayaran aman lewat Mayar.",

    "ebook.items.frontend.badge": "Baru rilis",
    "ebook.items.frontend.title": "Fullstack Design & Development Playbook",
    "ebook.items.frontend.description":
      "Buku praktis yang mengulas HTML, CSS, JavaScript, React, desain responsif, integrasi backend, Git, dan dasar UI/UX.",
    "ebook.items.frontend.highlight":
      "Pembelajar berlatar desain atau pemula serius yang butuh roadmap jelas dari wireframe sampai aplikasi siap rilis.",
    "ebook.items.frontend.price": "IDR 35K",
    "ebook.items.frontend.cta": "Beli di Mayar - IDR 35K",
    "ebook.items.frontend.secondaryCta": "Tanya dulu",
    "ebook.items.frontend.features.0":
      "Fundamental HTML, CSS, dan JavaScript yang dipecah dalam latihan praktis dan best practice terstruktur.",
    "ebook.items.frontend.features.1":
      "Inti React.js: Virtual DOM, JSX, komponen, props, state, list rendering, plus cara mulai proyek dengan Vite.",
    "ebook.items.frontend.features.2":
      "Desain responsif dengan Tailwind CSS serta integrasi backend memakai Fetch atau Axios lengkap dengan error handling.",
    "ebook.items.frontend.bonuses.0":
      "Cheatsheet alur kerja Git dari git init sampai deploy proyek ke Vercel.",
    "ebook.items.frontend.bonuses.1":
      "Template Figma Auto Layout, starter UI kit, dan tips desain high fidelity agar UI/UX tetap konsisten.",

    // Resources Section
    "resources.badge": "Resource",
    "resources.title": "Belajar atau berkolaborasi",
    "resources.description":
      "Tutorial dan e-book untuk mengembangkan skill di bidang frontend engineering dan desain.",
    "resources.tabs.tutorials.badge": "YouTube",
    "resources.tabs.tutorials.cta": "Tonton tutorial",
    "resources.collaboration.mentoring.title": "Mentoring & code review",
    "resources.collaboration.mentoring.desc":
      "Sesi satu-satu untuk bantu ngerapiin proyek, portofolio, atau bikin rencana belajar yang realistis.",
    "resources.collaboration.mentoring.cta": "Ajukan mentoring",
    "resources.collaboration.speaking.title": "Workshop & kolaborasi",
    "resources.collaboration.speaking.desc":
      "Ajak aku jadi speaker, co-host kelas live, atau kolaborasi bareng komunitasmu.",
    "resources.collaboration.speaking.cta": "Diskusi acara",
    "resources.collaboration.projects.title": "Project-based services",
    "resources.collaboration.projects.desc":
      "Konsultasi product development end-to-end dari desain hingga implementasi frontend untuk kebutuhan bisnis.",
    "resources.collaboration.projects.cta": "Diskusi proyek",

    // Collaboration Section
    "collaboration.badge": "Kolaborasi",
    "collaboration.title": "Mari berkolaborasi",
    "collaboration.description":
      "Siap berkolaborasi? Pilih cara kita bisa bekerja sama untuk mewujudkan ide-idemu.",

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
