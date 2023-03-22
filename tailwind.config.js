/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "select": "#FFE600",
        
      },
      backgroundImage: {
        "backgroundEvento": "url('/images/sections/bgeventos.png')",
      }
   
    }
    
  },
  plugins: [],
}