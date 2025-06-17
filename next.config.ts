import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/(dashboard)?",
        destination: "/dashboard/~",
        permanent: false
      },
      {
        source: "/sb",
        destination: "/sb/index.html",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
