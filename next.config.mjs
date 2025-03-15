/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js knows about the new src directory structure
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
