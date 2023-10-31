/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
      },
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
                source: '/app/:any*',
                destination: '/app',
            },
            {
                source: "/api/v1/:path*",
                destination: "http://localhost:5000/api/v1/:path*"
            }
        ]
    }
}

module.exports = nextConfig
