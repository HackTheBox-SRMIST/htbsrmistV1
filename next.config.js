/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
};

module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            crypto: false,
            path: false,
            os: false
        };

        return config;
    },
    images: {
        domains: [
            "htbsrmist.s3.ap-south-1.amazonaws.com",
            "upload.wikimedia.org",
            "i.ndtvimg.com"
        ]
    }
};
