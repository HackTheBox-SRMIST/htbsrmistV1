/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
};

module.exports = {
    images: {
        domains: [
            "htbsrmist.s3.ap-south-1.amazonaws.com",
            "upload.wikimedia.org",
            "i.ndtvimg.com"
        ]
    }
};
