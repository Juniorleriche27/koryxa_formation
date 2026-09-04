/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        koryxa: {
          sand: "#faf9f5",
          night: "#06251c",
          navy: "#06251c",
          ink: "#06251c",
          blue: "#0a4386",
          cyan: "#14b8a6",
          emerald: "#00a86b",
          "emerald-dark": "#008b58",
          green: "#00a86b",
          gold: "#f59e0b",
          border: "#dfe5d8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 168, 107, 0.22)",
        soft: "0 24px 60px rgba(15, 23, 42, 0.08)",
        card: "0 4px 24px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "koryxa-radial": "radial-gradient(circle at top left, rgba(0,168,107,.14), transparent 34rem), radial-gradient(circle at top right, rgba(245,158,11,.08), transparent 30rem)",
      },
    },
  },
  plugins: [],
  safelist: ["bg-white/2", "bg-white/3", "border-white/8"],
};
