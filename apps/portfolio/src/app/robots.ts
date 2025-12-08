import { SITE_BASE_URL } from '@/config';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/en/blog/documents/',
        '/fr/blog/documents/',
        '/en/blog/images/',
        '/fr/blog/images/',
        '/logos',
      ],
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
