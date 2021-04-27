const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const { i18n } = require('./next-i18next.config')

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true
  },
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // prettier-ignore
      // eslint-disable-next-line global-require
      require('./scripts/sitemap');
    }

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
})
