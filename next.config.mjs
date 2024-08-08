/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: false,
                has: [
                    {
                        type: 'cookie',
                        key: 'token',
                        value: '(?!.*)' // Ensure token cookie is present
                    }
                ]
            }
        ];
    },
    // Add any other Next.js configurations here
};

export default nextConfig;
