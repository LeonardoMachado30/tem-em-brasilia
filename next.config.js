/** @type {import('next').NextConfig} */
//firebase emulators:start --only hosting
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
