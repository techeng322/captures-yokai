/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Workaround for Windows symlink issues in standalone mode
  // On Windows, enable Developer Mode or run build in Docker
  experimental: {
    outputFileTracingRoot: process.platform === 'win32' ? undefined : undefined,
  },
};

module.exports = nextConfig;
