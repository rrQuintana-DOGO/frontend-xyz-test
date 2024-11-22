/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      'regular': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
    },
    fontSize: {
      '6xl': '4rem',
      '5xl': '3rem',
      '4xl': '2.25rem',
      '3xl': '1.875rem',
      '2xl': '1.5rem',
      'xl': '1.25rem', //
      'lg': '1.125rem',
      'base': '1rem',
      'sm': '.875rem',
      'xs': '.75rem',
    },
    extend: {
      colors: {
        blueDogo: '#0071C2'
      }
    },
  },
  plugins: [],
}

