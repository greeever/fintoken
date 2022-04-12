const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
   plugins: [require("daisyui")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "blue",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['Ramaraja', defaultTheme.fontFamily.serif],
        sans: ['Montserrat', defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};
