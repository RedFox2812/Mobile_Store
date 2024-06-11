/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "main-clo": "#4f8bff",
      "hover-clo": "#e9edff",
      "text-clo": "#6b6b6b",
      "red-clo": "#D0021C",
      "green-clo": "#94e9b5",
      "gray-clo": "#ccc",
      "backgruond-clo": "#dde3ec",
      "list-clo": "#fbf9f9",
      "white-clo": "#fff",
    },
    font: {},
  },
  plugins: [],
};
