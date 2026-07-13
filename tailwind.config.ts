import type { Config } from "tailwindcss";

const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        paper: rgb("--paper"),
        surface: { DEFAULT: rgb("--surface"), 2: rgb("--surface-2") },
        ink: { DEFAULT: rgb("--ink"), soft: rgb("--ink-soft"), faint: rgb("--ink-faint") },
        line: rgb("--line"),
        brand: {
          50: rgb("--brand-50"),
          100: rgb("--brand-100"),
          200: rgb("--brand-200"),
          300: rgb("--brand-300"),
          400: rgb("--brand-400"),
          500: rgb("--brand-500"),
          600: rgb("--brand-600"),
          700: rgb("--brand-700"),
          800: rgb("--brand-800"),
          900: rgb("--brand-900"),
          DEFAULT: rgb("--brand-600"),
        },
        gold: {
          50: rgb("--gold-50"),
          100: rgb("--gold-100"),
          200: rgb("--gold-200"),
          300: rgb("--gold-300"),
          400: rgb("--gold-400"),
          500: rgb("--gold-500"),
          600: rgb("--gold-600"),
          700: rgb("--gold-700"),
          800: rgb("--gold-800"),
          900: rgb("--gold-900"),
          DEFAULT: rgb("--gold-500"),
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid, restrained display scale
        "display-lg": ["clamp(2.5rem, 5vw + 1rem, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 3.5vw + 1rem, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.6rem, 2vw + 0.8rem, 2.4rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(16 22 24 / 0.04), 0 8px 24px -12px rgb(16 22 24 / 0.10)",
        lift: "0 2px 4px rgb(16 22 24 / 0.05), 0 24px 48px -20px rgb(16 22 24 / 0.18)",
      },
      maxWidth: { prose: "68ch" },
      transitionTimingFunction: { "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" },
    },
  },
  plugins: [],
};

export default config;
