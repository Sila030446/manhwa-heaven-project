/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "manga-heaven.s3.ap-southeast-1.amazonaws.com",
      "nexamanga.s3.ap-southeast-2.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manga-heaven.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
