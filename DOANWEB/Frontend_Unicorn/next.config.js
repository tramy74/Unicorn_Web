/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "i.imgur.com",
      "image.uniqlo.com",
      "bizweb.dktcdn.net",
      "res.cloudinary.com",
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
