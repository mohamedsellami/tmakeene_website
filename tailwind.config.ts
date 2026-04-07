import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "midnight-blue": "#243A5E",
        "classic-blue-green": "#34A0A4",
        "warm-amber": "#D9A441",
        "primary-blue": "#2563EB",
        "off-white": "#F6F7F9",
        "primary-text": "#1E1E1E",
        grey: "#6B7280",
        "cool-grey": "#9CA3AF",
        "light-grey": "#BAC5DD",
        cardinal: "#C71F37",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans-arabic)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
