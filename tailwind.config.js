/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    fontSize: {
      xxs: '0.7rem',
      xs: '0.8rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2.5rem',
      '5xl': '2.75rem',
      '6xl': '3rem',
    },
    extend: {
      aspectRatio: {
        'article-image': '2 / 1',
      },
      objectPosition: {
        'center-top': 'center top',
      },
      fontFamily: {
        VarsityTeam: ['var(--font-varsity-team)', ...fontFamily.sans],
        Roboto: ['var(--font-roboto)', ...fontFamily.sans],
      },
      colors: {
        appBgColor: "#FCF0E2",
        infoColor: "#FEF4D8",
        'green': "#3F802B",
        'booking-blue': "#013b96",
        'blue': "#385e80",
        'light-blue': "#11a1e2"
      },
      lineHeight: {
        hero: '4.5rem',
      },
      spacing: {
        'xxs': '0.3125rem',
        'xs': '0.625rem',
        's': '0.9375rem',
        'm': '1.25rem',
        'l': '1.5625rem',
        'xl': '1.875rem',
        '2xl': '2.5rem',
        '3xl': '3.75rem',
        '4xl': '5rem',
      }
    },
  },
  plugins: [],
};




