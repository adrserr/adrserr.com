/* eslint-disable no-param-reassign */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const { ESBuildMinifyPlugin } = require('esbuild-loader')

const { i18n } = require('./next-i18next.config')

// ESBUILD LOADER

function useEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === 'TerserPlugin'
  )
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(
      terserIndex,
      1,
      new ESBuildMinifyPlugin(options)
    )
  }
}

function useEsbuildLoader(config, options) {
  const tsxLoader = config.module.rules.find(
    (rule) => rule.test && rule.test.test(/\.tsx?$/)
  )

  if (tsxLoader) {
    tsxLoader.use.loader = 'esbuild-loader'
    tsxLoader.use.options = options
  }
}

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy', // No harlem shake
    value: ContentSecurityPolicy.replace(/\n/g, '')
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
]

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true
  },
  images: {
    domains: ['i.scdn.co']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  },
  webpack: (config, { isServer, dev, webpack }) => {
    if (isServer) {
      // prettier-ignore
      // eslint-disable-next-line global-require
      require('./scripts/sitemap');
    }

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    useEsbuildMinify(config)

    useEsbuildLoader(config, {
      loader: 'tsx',
      target: 'es2017'
    })

    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat'
    //   })
    // }
    return config
  },
  i18n
})
