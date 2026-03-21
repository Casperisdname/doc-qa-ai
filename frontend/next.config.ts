import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    // This is the "Nuclear Option" for the canvas error
    config.resolve.alias.canvas = false
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    }
    return config
  },
}

export default nextConfig
