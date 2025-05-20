/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false, // Matikan App Router agar pakai Pages Router
  },
};

module.exports = nextConfig;
