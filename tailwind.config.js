const colors = require('tailwindcss/colors')
const { spacing, fontFamily } = require('tailwindcss/defaultTheme')
const tailwindTypography = require('@tailwindcss/typography')

module.exports = {
  mode: 'jit',
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
      gray: colors.blueGray,
      blue: colors.blue,
      rose: colors.rose,
      spotify: {
        green: '#1db954',
        white: '#fff',
        black: '#191414'
      }
    },
    // Footer with flexbox
    flex: {
      container: '1 0 auto'
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800')
              },
              code: { color: theme('colors.blue.400') }
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            blockquote: {
              color: theme('colors.gray.700')
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600')
              },
              code: { color: theme('colors.blue.400') }
            },
            h1: {
              color: theme('colors.gray.50')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            strong: {
              color: theme('colors.gray.300'),
              'font-weight': 700
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            }
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
