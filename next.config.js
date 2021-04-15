const { i18n } = require('./next-i18next.config')

module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }
    return config
  },
  i18n
}
