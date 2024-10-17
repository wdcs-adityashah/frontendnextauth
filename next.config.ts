import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Add this line to enable static export

  // ... other configurations ...
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
    domains: ['lh3.googleusercontent.com'],
  },

};

module.exports = nextConfig
