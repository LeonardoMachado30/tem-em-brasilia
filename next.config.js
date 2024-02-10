/** @type {import('next').NextConfig} */
//firebase emulators:start --only hosting
const nextConfig = {
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  // experimental: {
  //   typedRoutes: true,
  // },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  // trailingSlash: true,
};

module.exports = nextConfig;
