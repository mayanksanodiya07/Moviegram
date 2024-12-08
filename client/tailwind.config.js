/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        "3xl": "1.8rem",
      },
      colors: {
        'color-primary': '#6741d9',
        'color-primary-light': '#7950f2',
        'color-text': '#dee2e6',
        'color-text-dark': '#adb5bd',
        'color-background-100': '#343a40',
        'color-background-500': '#2b3035',
        'color-background-900': '#212529',
        'color-red': '#fa5252',
        'color-red-dark': '#e03131',
      },
      boxShadow: {
        '3xl': '0 8px 20px rgba(0, 0, 0, 0.8)',
        '4xl': '0 1.2rem 2.4rem rgba(0,0,0,0.2)',

      }
    },
  },
  plugins: [],
};
