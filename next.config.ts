import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ielts-preparation",
        permanent: false,
      },
      {
        source: "/freelance-english",
        destination: "/ielts-preparation",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
