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
        "backgroundImpacto": "url('/images/sections/impacto.png')",
        "backgroundObjetivosmall": "url('/images/sections/objetivos_sm.png')",
        "backgroundObjetivolgR": "url('/images/sections/objetivos_lg_r.png')",
        "backgroundObjetivolgL": "url('/images/sections/objetivos_lg_l.png')",
        "backgroundLayer": "url('/images/layer.png')",
        "backgroundFlyer2024": "url('/images/flyer-vmc-2024.jpg')",
      }
   
    }
    
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"]
  },
}