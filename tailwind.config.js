/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#141414',
          700: '#1f1f1f',
          DEFAULT: '#0a0a0a'
        },
        caramel: {
          50: '#fafafa',
          100: '#f4f4f5',
          400: '#e4e4e7',
          500: '#27272a',
          600: '#09090b',
          700: '#000000',
          DEFAULT: '#09090b'
        },
        latte: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f4f4f5',
          300: '#e4e4e7',
          DEFAULT: '#fafafa'
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        body: ['Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'spin-slow': 'spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' }
        }
      }
    },
  },
  plugins: [],
}
