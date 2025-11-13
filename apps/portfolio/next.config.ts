import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  output: 'standalone',
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/features/internationalization/lib/request.ts',
  experimental: {
    createMessagesDeclaration: './src/features/internationalization/messages/en.json',
  },
});

export default withNextIntl(nextConfig);
