/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bo7: {
          orange: '#FF9F00',
          red: '#FF3333',
          black: '#0a0a0a',
          panel: '#121212',
          cyan: '#00F0FF',
        }
      },
      fontFamily: {
        bo7: ['"Black Ops One"', 'cursive'],
        tech: ['"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'tech-grid': "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
