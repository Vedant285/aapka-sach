import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // LOGO COLORS
        "brand-blue": "#00308F", // The Deep Blue from the Globe/SACH
        "brand-red": "#D00000",  // The Red from AAPKA
        "brand-gold": "#FFB800", // The Gold Swoosh (for accents)
        "brand-dark": "#0a0a0a",
        
        // MAPPINGS FOR OLD CODE (Prevents crashes)
        "tv10-gold": "#FFB800",  
        "tv10-metal": "#00308F", 
        "tv10-red": "#D00000",
        "tv10-cream": "#f4f4f4",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;