/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        main: "url('/assets/background/main.jpg')",
      },
      colors: {
        /* Primary Colors */
        "primary-900": "#2e2e2e",
        "primary-800": "#4d4d4d",
        "primary-700": "#737373",
        "primary-600": "#999999",
        "primary-500": "#b3b3b3" /* Default */,
        "primary-400": "#cccccc",
        "primary-300": "#e6e6e6",
        "primary-200": "#f2f2f2",
        "primary-100": "#f9f9f9",
        "primary-50": "#ffffff", // White as primary

        /* Secondary Colors */
        "secondary-900": "#002d5d",
        "secondary-800": "#004387",
        "secondary-700": "#005aad",
        "secondary-600": "#0071d3",
        "secondary-500": "#007bff" /* Default */,
        "secondary-400": "#329bff",
        "secondary-300": "#66b3ff",
        "secondary-200": "#99ccff",
        "secondary-100": "#cce6ff",
        "secondary-50": "#e5f2ff",

        /* Tertiary Colors */
        "tertiary-900": "#19573e", // Cool green as tertiary
        "tertiary-800": "#2c825f",
        "tertiary-700": "#389975",
        "tertiary-600": "#46b38b",
        "tertiary-500": "#53c7a1" /* Default */,
        "tertiary-400": "#75dab5",
        "tertiary-300": "#97edc9",
        "tertiary-200": "#b9ffd9",
        "tertiary-100": "#dbffe8",
        "tertiary-50": "#edfff2",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
