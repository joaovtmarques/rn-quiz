/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screens/js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      tWhite: '#FFFFFF',
      lightGrey: '#EBEBEB',
      darkGrey: '#676767',
      green: '#61E8A7',
      red: '#E86161',
    },
  },
  plugins: [],
};
