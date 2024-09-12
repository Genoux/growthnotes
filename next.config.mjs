/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'beehiiv-images-production.s3.amazonaws.com',
      'tinyurl.com',
      'files.cohostpodcasting.com',
    ],
  },
}

export default nextConfig
