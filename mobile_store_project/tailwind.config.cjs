/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        hover: "var(--hover-color)",
        text: "var(--text-color)",
        green: "var(--green-color)",
        bg: "var(--bg-color)",
        list: "var(--list-color)",
        white: "var(--white-color)",
        black: "var(--black-color)",
        red: "var(--red-color)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
