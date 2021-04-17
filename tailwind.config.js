const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')
const tailwindTypography = require('@tailwindcss/typography')

module.exports = {
  // mode: 'jit', // FIXME: not working
  purge: {
    enabled: true,
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: ['dark'] // specific classes https://github.com/tailwindlabs/tailwindcss/discussions/2793#discussioncomment-142172
    }
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Raleway', ...fontFamily.sans]
    },
    colors: {
      gray: colors.blueGray
    },
    // Footer with flexbox
    flex: {
      container: '1 0 auto'
    },
    typography: () => ({}),
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.blueGray.50')
          }
        }
      })
    },
    variants: {
      typography: ['dark'],
      appearance: []
    }
  },
  plugins: [tailwindTypography]
}
