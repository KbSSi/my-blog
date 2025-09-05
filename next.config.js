/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [],
  },
  // 启用 gzip 压缩
  compress: true,
  // 优化构建
  swcMinify: true,
}

module.exports = nextConfig
