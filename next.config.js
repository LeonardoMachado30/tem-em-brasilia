/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost:5000/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
