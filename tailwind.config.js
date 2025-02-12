const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
   plugins: [],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
