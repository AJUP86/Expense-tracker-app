/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        haha: '#FFFFFF',
        black: '#000000',
        darkGray: '#333333',
        lightGray: '#CCCCCC',
        red: '#FF0000',
        blue: '#0000FF',
        yellow: '#FFFF00',
        beige: '#f7f1eb',
        customBlue: '#c1d7e0'
      },

      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        display: ['Impact', 'Arial Black', 'sans-serif']
      }
    }
  },
  plugins: []
}
