/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF8E1", // Lightest yellow
          100: "#FFEB99", // Light yellow
          200: "#FFDC66",
          300: "#FFD233",
          400: "#F4A300", // Main yellow
          500: "#D68900", // Dark yellow
          600: "#B77F00",
          700: "#9B7300",
          800: "#7F5D00",
          900: "#654800", // Darkest yellow
        },
        secondary: {
          50: "#D3DDE3", // Lightest blue
          100: "#A7B7C7",
          200: "#7D99AB",
          300: "#4C7A8F",
          400: "#2D3E50", // Main dark blue
          500: "#253A47",
          600: "#1F2A36", // Darker blue
          700: "#19222A",
          800: "#141C1F",
          900: "#0D1618", // Darkest blue
        },
        accent: {
          50: "#FFEBEE", // Lightest red
          100: "#FFB3B8",
          200: "#FF7B80",
          300: "#FF4350",
          400: "#E53935", // Main red
          500: "#D32F2F",
          600: "#C62828", // Darker red
          700: "#A42424",
          800: "#8B1C1C",
          900: "#6E1414", // Darkest red
        },
        lightBackground: "#F8F9FA", // Light neutral background
        darkBackground: "#1A202C", // Dark background for sections or footers
        border: "#E2E8F0", // Soft light grey for borders and dividers
        textPrimary: "#2D3E50", // Primary text color (dark blue for readability)
        textSecondary: "#4A5568", // Secondary text color (darker grey for less emphasis)
        buttonPrimary: "#F4A300", // Yellow for buttons to catch attention
        buttonHover: "#FFB84D", // Lighter yellow for hover effects on buttons
        success: "#28A745", // Green for success messages or confirmations
        warning: "#FFC107", // Yellow for warning messages or notifications
        error: "#DC3545", // Red for error messages or alerts
      },
    },
  },
  plugins: [],
};
