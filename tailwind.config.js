/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "kangwon-light": ["kangwon-light", "sans-serif"],
        "kangwon-bold": ["kangwon-bold", "sans-serif"],
      },
      colors: {
        skyblue1: "#b3e5fc",
        blue1: "#6879D0",
        blue2: "#4556ad",
      },
    },
  },
  plugins: [],
};
