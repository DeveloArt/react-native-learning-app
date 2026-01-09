/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './App.tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Text colors (used)
        textPrimary: '#1d1d1d',
        'textPrimary-dark': '#ffffff',
        textSecondary: '#575757',
        'textSecondary-dark': '#BDBDBD',
        textActionSecondary: '#0d59f2',
        'textActionSecondary-dark': '#0A47C2',
        textDisabled: '#A3A3A3',

        // Surface colors (used)
        surfacePrimary: '#ffffff',
        'surfacePrimary-dark': '#1D1D1D',
        surfaceSecondary: '#f7f7f7',
        'surfaceSecondary-dark': '#101010',
        surfaceTertiary: '#ededed',
        'surfaceTertiary-dark': '#292929',
        surfaceAccentLight: '#e7f7fe',
        surfaceDisabled: '#ededed',
        'surfaceDisabled-dark': '#292929',

        // Secondary Action (Blue)
        surfaceActionSecondary: '#0d59f2',
        surfaceActionSecondaryPress: '#0A47C2',
        'surfaceActionSecondary-dark': '#0d59f2',
        surfaceActionSecondaryLight: '#E6EFFD',
        'surfaceActionSecondaryLight-dark': '#19315B',

        // Icon colors (used)
        iconInfo: '#305a85',
        'iconInfo-dark': '#6F9ECE',

        // Border colors (used)
        borderPrimaryDefault: '#d7d7d7',
        'borderPrimaryDefault-dark': '#3D3D3D',
      },
      fontSize: {
        fontSizeXs: '0.625rem', // 10px
        fontSizeS: '0.75rem', // 12px
        fontSizeM: '0.875rem', // 14px
        fontSizeL: '1rem', // 16px
        fontSizeXl: '1.125rem', // 18px
        fontSize2Xl: '1.250rem', // 20px
        fontSize3xl: '1.5rem', // 24px
        fontSize4xl: '2rem', // 32px
        fontSize5xl: '2.25rem', // 36px
      },
      lineHeight: {},
      boxShadow: {
        shadowM: '0px 8px 40px 0px rgba(54, 54, 54, 0.08)',
      },
      fontFamily: {
        montserratRegular: ['MontserratRegular'],
        montserratSemiBold: ['MontserratSemiBold'],
        montserratBold: ['MontserratBold'],
        montserratLight: ['MontserratLight'],
        montserratMedium: ['MontserratMedium'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode support
  safelist: [],
};
