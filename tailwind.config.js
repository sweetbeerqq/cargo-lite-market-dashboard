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
        meadow: '#7ED957',
        candy: '#FF78B7',
        skyjam: '#66D9EF',
        sunpop: '#FFD166',
        plum: '#7C5CFF',
        ink: '#243047',
        cream: '#FFF7DF',
        lagoon: '#1AA6A6',
      },
      boxShadow: {
        toon: '0 10px 0 rgba(36,48,71,0.12), 0 18px 40px rgba(36,48,71,0.16)',
      },
    },
  },
  plugins: [],
};
