/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Breve: ["Breve", "sans-serif"],
      },
      colors: {
        yellow: "#FFB55E",
        midnight: "#33374c",
        purple: "#5440DA",
        "purple-dark": "#3c2d99",
      },
    },
  },
  plugins: [],
};
