/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#010101 ",
        darkCardBg: "#090909",
        primaryColor: "#ffd803",
      },
    },
  },
  plugins: [],
};
