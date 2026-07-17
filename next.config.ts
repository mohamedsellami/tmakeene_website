import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/freelance-english",
        destination: "/ielts-preparation",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
