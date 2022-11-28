/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
// }
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
  },
})
// module.exports = nextConfig
