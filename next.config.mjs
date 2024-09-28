/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mixtape-builder.vercel.app"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
