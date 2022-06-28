const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://sukien.doppelherz.vn/api/:path*',
        },
      ]
    },
    images: {
      loader: 'imgix',
      path: 'https://prm-doppelherz.web.app',
      domains: [
        'tailwindui.com',
        'doppelherz.vn',
        'sukien.doppelherz.vn'
      ]}
}

module.exports = withPlugins([[withImages]], nextConfig)
