import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'], // https://stackoverflow.com/questions/75697312/import-mongoose-lib-in-api-directory-in-next-js-13-2-app-directory-gives-error
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },
};

export default nextConfig;
