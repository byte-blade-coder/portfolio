/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        blue: {
          50: 'var(--primary-50)',
          100: 'var(--primary-50)',
          200: 'var(--primary-50)',
          300: 'var(--primary-400)',
          400: 'var(--primary-400)',
          500: 'var(--primary-600)',
          600: 'var(--primary-600)',
          700: 'var(--primary-600)',
          800: 'var(--primary-900)',
          900: 'var(--primary-900)',
          950: 'var(--primary-900)',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}