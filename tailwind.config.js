/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      accent: "#374060",
      lightPink: "#FFEDFB",
      pink: "#FF96C8",
      accentDark: "#0E183B",
      ink: "#333",
      subtle: "#FAFAFA",
      border: "#E5E5E5",
      blue: {
        0: "#2eb5c0",
        200: "#99c9ed",
        300: "#66afe5",
        400: "#3394dc",
        500: "#0079d3",
        600: "#0061a9",
        700: "#00497f",
        800: "#003054",
        900: "#00182a",
      },
      invert: "#fff",
      purple: "#7e5bef",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
