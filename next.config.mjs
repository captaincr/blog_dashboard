/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "file-upload-project.blr1.digitaloceanspaces.com",
            },
            {
                protocol: "https",
                hostname: "sashakt-scholarship.s3.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "sashakt-scholarship.s3.ap-south-1.amazonaws.com",
            },
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
        serverComponentsExternalPackages: ["@google/generative-ai"]
    },
};

export default nextConfig;
