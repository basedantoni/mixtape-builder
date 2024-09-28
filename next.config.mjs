/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mixtape-builder.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
