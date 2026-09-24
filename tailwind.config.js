/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { cocoa: '#3c1f26', berry: '#8f314c', blush: '#f7e8e5', cream: '#fffaf4', gold: '#bd7b3c' },
      fontFamily: { display: ['Cormorant Garamond', 'Georgia', 'serif'], sans: ['DM Sans', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 18px 50px rgba(60, 31, 38, 0.10)' },
    },
  },
  plugins: [],
}
