const path = require("path");
const { pack, unpack } = require("msgpackr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
    experimental: {
        webpackMemoryOptimizations: true,
    },
    webpack(config, { dev }) {
        config.module.rules.unshift({
            test: /\.(txt|html|svg)$/,
            use: [
                path.resolve(__dirname, "buffer-loader.js"),
            ],
        });
        if (dev) {
            // ‘true’ is an alias for { type: 'memory' }
            config.cache = true;
        }
        return config;
    },
  // images: {
  //   unoptimized: true,
  // },
}

export default nextConfig
