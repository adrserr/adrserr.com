const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')
const tailwindTypography = require('@tailwindcss/typography')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Montserrat', ...fontFamily.sans]
    },
    colors: {
      gray: colors.blueGray
    },
    // Footer with flexbox
    flex: {
      container: '1 0 auto'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindTypography]
}
