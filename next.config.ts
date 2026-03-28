import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/cityhopper",
        destination: "https://flight-search-xi-three.vercel.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
