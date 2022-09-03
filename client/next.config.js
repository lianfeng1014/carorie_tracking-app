/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env:{
    API_ENDPOINT: process.env.API_ENDPOINT
  }
}

module.exports = nextConfig
