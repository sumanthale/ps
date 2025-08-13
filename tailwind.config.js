/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
theme: {
    extend: {
      keyframes: {
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
      },
      animation: {
        pulseScale: 'pulseScale 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
