/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Pass environment variables to server-side code
  env: {
    BACKLOG_AWS_REGION: process.env.BACKLOG_AWS_REGION,
    DYNAMODB_BACKLOG_TABLE: process.env.DYNAMODB_BACKLOG_TABLE,
    BACKLOG_AWS_ACCESS_KEY_ID: process.env.BACKLOG_AWS_ACCESS_KEY_ID,
    BACKLOG_AWS_SECRET_ACCESS_KEY: process.env.BACKLOG_AWS_SECRET_ACCESS_KEY,
  },
};

export default nextConfig;
