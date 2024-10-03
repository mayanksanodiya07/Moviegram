/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        "3xl": "1.8rem",
      },
      colors: {
        "color-primary": "#7950f2",
      },
    },
  },
  plugins: [],
};
