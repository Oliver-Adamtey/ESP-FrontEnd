/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      // fontWeight: {
      //   light: 300,
      //   normal: 400,
      //   medium: 500,
      //   bold: 700,
      //   black: 900,
      // },

    },
  },
  plugins: [],
}
