import type { MetadataRoute } from 'next';
import { getPathname } from '@/features/internationalization/lib/navigation';

const host = 'https://pierregueroult.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: host + getPathname({ locale: 'fr', href: '/' }),
        },
      },
    },
  ];
}
