/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
// }

// module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })
//
// module.exports = withBundleAnalyzer({
//   reactStrictMode: false,
//   swcMinify: true,
//   env: {
//     NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
//   },
// })

const withPWA = require('next-pwa')({
  dest: 'public',
  mode: 'production',
  disable: false,
})

module.exports = withPWA({
  reactStrictMode: false,
  swcMinify: true
})

