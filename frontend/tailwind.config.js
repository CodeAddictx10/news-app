/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-1x": "#F4F4F4",
        "white-2x": "#FFFDF9",
        "black-1x": "#000000",
        "black-2x": "#1A1A1A",
        "red-1x": "#FC0000",
        "red-2x": "#BF0A0A",
        "drey-1x": "#828282",
        "drey-2x": "#4F4F4F",
      },
      fontFamily: {
        display: ["Frijole", "sans-serif"],
        heading: ["Castoro Titling", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
