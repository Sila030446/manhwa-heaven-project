/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "https://manga-heaven.s3.ap-southeast-1.amazonaws.com/",
      "manga-heaven.s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
