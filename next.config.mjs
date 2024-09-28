/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "mixtape-builder.vercel.app",
        port: "",
        pathname: "/stickers/**",
      },
    ],
  },
};

export default nextConfig;
