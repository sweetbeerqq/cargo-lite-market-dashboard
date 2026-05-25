/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
        display: ['"Trebuchet MS"', 'Inter', 'sans-serif'],
      },
      colors: {
        meadow: '#16A34A',
        candy: '#D946EF',
        skyjam: '#0EA5E9',
        sunpop: '#F59E0B',
        plum: '#4F46E5',
        ink: '#1F2937',
        cream: '#F8FAFC',
        lagoon: '#0F766E',
      },
      boxShadow: {
        toon: '0 18px 45px rgba(31,41,55,0.10)',
      },
    },
  },
  plugins: [],
};
