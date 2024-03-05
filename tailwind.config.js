/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#F68531",
        primaryLight: "#FFB05C",
        primaryDark: "#DE672C",
        secondary: "#B1B1B1",
        secondaryLight: "#EDEDED",
        secondaryDark: "#575757",
      },
    },
  },
  plugins: [],
};
