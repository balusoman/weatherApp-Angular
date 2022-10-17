/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        primaryOrange:'hsl(24, 100%, 50%)',
        primaryBlack:'hsl(240, 40%, 5%)',
        darkPrimary: 'rgb(38, 8, 75)', 
      }
    },
  },
  plugins: [],
}