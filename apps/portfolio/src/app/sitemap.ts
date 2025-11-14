import type { MetadataRoute } from 'next';
import { getPathname } from '@/features/internationalization/lib/navigation';
import { SITE_BASE_URL } from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: SITE_BASE_URL + getPathname({ locale: 'fr', href: '/' }),
        },
      },
    },
  ];
}
