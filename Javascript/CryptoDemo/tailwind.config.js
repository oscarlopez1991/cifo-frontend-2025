/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.js',
    './src/**/*.{js,css,html}',
    './components/**/*.{js,css,html}',
    './pages/**/*.{js,css,html}',
    './services/**/*.{js,css,html}',
    './utils/**/*.{js,css,html}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
