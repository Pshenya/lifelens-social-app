/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',

      },
    },
    extend: {
      colors: {
        'primary-500': 'var(--color-primary-500)',
        'primary-600': 'var(--color-primary-600)',
        'primary-700': 'var(--color-primary-700)',
        'secondary-500': 'var(--color-secondary-500)',
        'off-white': 'var(--color-off-white)',
        'red': 'var(--color-red)',
        'dark-1': 'var(--color-dark-1)',
        'dark-2': 'var(--color-dark-2)',
        'dark-3': 'var(--color-dark-3)',
        'dark-4': 'var(--color-dark-4)',
        'dark-5': 'var(--color-dark-5)',
        'dark-6': 'var(--color-dark-6)',
        'light-1': 'var(--color-light-1)',
        'light-2': 'var(--color-light-2)',
        'light-3': 'var(--color-light-3)',
        'light-4': 'var(--color-light-4)',
        'semitransaperent-1': 'var(--color-semitransaperent-1)',
      },
      screens: {
        'xs': '480px',

      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        chirp: ['Chirp', 'sans-serif'],
        roboto: ['Roboto Mono', 'sans-serif'],
      },
      variants: {
        extend: {
          ringOffsetColor: ['focus-visible'],
          transitionProperty: ['responsive', 'motion-safe', 'motion-reduce', 'focus', 'focus-visible'],
          transitionDuration: ['responsive', 'motion-safe', 'motion-reduce', 'focus', 'focus-visible'],
          transitionTimingFunction: ['responsive', 'motion-safe', 'motion-reduce', 'focus', 'focus-visible'],
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('flowbite/plugin'),
  ],
};

// /** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   darkMode: ['class'],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//       screens: {
//         '2xl': '1400px',

//       },
//     },
//     extend: {
//       colors: {
//         'primary-500': '#FEF863', // Light yellow
//         'primary-600': '#FEEA00', // A little darker yellow
//         'primary-700': '#65A9E0', // Lighter shade of blue
//         'secondary-500': '#FF715B', // Orange secondary color
//         'off-white': '#D0DFFF',
//         'red': '#FF5246',
//         'dark-1': '#000000', // Darker black
//         'dark-2': '#121212', // Slightly lighter black
//         'dark-3': '#222222', // Medium black
//         'dark-4': '#2B2B2B', // Light black
//         'light-1': '#FFFFFF', // Pure white
//         'light-2': '#F0F0F0', // Slightly off-white
//         'light-3': '#A8A8A8', // Light gray
//         'light-4': '#878787', // Medium gray
//       },
//       screens: {
//         'xs': '480px',

//       },
//       width: {
//         '420': '420px',
//         '465': '465px',
//       },
//       fontFamily: {
//         inter: ['Inter', 'sans-serif'],

//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: 0 },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: 0 },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//     },
//   },
//   plugins: [require('tailwindcss-animate')],
// };