/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/,
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.netlify.app',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
};

module.exports = nextConfig;
