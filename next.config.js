/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    APIhost: 'https://admin.vemastercup.com',
    // APIhost: 'http://localhost:8000',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-W0C0MEQS4Z'
  },
  images: {
    domains: ['admin.vemastercup.com', 'localhost'],
  },
}