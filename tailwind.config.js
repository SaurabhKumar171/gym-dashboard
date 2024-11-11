/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#1A3452',
        dark1: '#171A1F',
        dark2: '#1E252D',
        light: '#EAEAEA',
        grey: '#8E8E8E',
      },
    },
  },
  plugins: [],
}