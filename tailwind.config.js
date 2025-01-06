/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", // Deep Blue
          light: "#3B82F6", // Lighter Blue
          dark: "#1E40AF", // Darker Blue
        },
        secondary: {
          DEFAULT: "#F59E0B", // Warm Gold
          light: "#FBBF24", // Lighter Gold
          dark: "#D97706", // Darker Gold
        },
        accent: {
          DEFAULT: "#EF4444", // Vibrant Red
          success: "#10B981", // Fresh Green
          warning: "#F59E0B", // Warm Gold (reused for warnings)
        },
        neutral: {
          DEFAULT: "#6B7280", // Soft Gray
          light: "#F3F4F6", // Light Gray
          dark: "#1F2937", // Dark Charcoal
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Poppins as default sans font
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};