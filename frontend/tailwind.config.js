/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'brutal-black': '#101010',
        'brutal-white': '#f5f5f5',
        'brutal-gray': '#747474',
        'brutal-red': '#ff2e2e',
        'brutal-blue': '#0066ff',
      }
    },
  },
  plugins: [],
}

