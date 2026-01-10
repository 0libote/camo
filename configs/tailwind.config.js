/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../src/index.html",
    "../src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Chakra Petch', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#ff6b00',
      },
    },
  },
  plugins: [],
}
