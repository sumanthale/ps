/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sacramento': ['Sacramento', 'cursive'],
        'kalam': ['Kalam', 'cursive'],
        'comfortaa': ['Comfortaa', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
        'dancing': ['Dancing Script', 'cursive'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      keyframes: {
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.02)' },
        },
        lovePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      },
      animation: {
        pulseScale: 'pulseScale 1s infinite ease-in-out',
        gentleBounce: 'gentleBounce 3s ease-in-out infinite',
        lovePulse: 'lovePulse 2s ease-in-out infinite',
        floatSmooth: 'floatSmooth 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
      colors: {
        kawaii: {
          pink: '#ffb6c1',
          blue: '#a8dfff',
          purple: '#dda0dd',
          yellow: '#fff8dc',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
