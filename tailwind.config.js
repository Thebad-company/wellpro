/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellpro: {
          green: '#7AC143',
          orange: '#F7941E',
          navy: '#0B0D17',
          blue: '#00ADEF',
          purple: '#662D91',
          red: '#ED1C24',
          yellow: '#FFF200',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
