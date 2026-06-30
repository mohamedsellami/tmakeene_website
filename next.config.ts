import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary: send home traffic to the freelance English landing page.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/freelance-english",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
