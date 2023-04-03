/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // "sans": ["Helvetica"]
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      "blue-dark": "#2E344D",
      "blue-dark-hover": "#434c70",
      "blue-light": "#F5F7FB",
      transparent: "transparent",
    },
  },
  plugins: [],
};
