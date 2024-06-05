/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: [ 'Gilroy' ],
        myFont: [ 'myFont' ],
      },
      screens: {
        'tablet': { 'max': "1020px" },
        'mobile': { 'max': "720px" }
      },
      colors: {
        background: "#071108"
      }
    },
  },
  plugins: [],
};