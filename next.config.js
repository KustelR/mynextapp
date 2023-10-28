/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**"
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: "http://localhost:5000/api/v1/:path*"
            }
        ]
    }
}

module.exports = nextConfig
