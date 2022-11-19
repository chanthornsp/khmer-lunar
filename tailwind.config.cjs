/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        hanuman:[ "Hanuman", "Arial", "serif"],
        nokora:[ "Nokora", "Arial", "serif"],
        moul:[ "Moul", "Arial Rounded Bold", "serif"],
        moulpali:[ "Moulpali", "Arial", "serif"],
      }
    },
  },
  plugins: [],
}
