import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
  assetPrefix: isProd ? '/lyrics-finder/' : '',
  basePath: isProd ? '/lyrics-finder' : '',
  output: 'export'
};

export default nextConfig;
