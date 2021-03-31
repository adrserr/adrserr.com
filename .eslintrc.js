module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jsx-a11y'
  ],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    // disable eslint rule and add typescript eslint one to avoid errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'object-curly-newline': 'off',
    'react/require-default-props': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  globals: {
    JSX: true
  }
}
