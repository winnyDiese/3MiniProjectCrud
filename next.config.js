/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env:{
    MONGODB_URI:"mongodb://127.0.0.1:27017/taskCrudApp"
  }
}

module.exports = nextConfig
