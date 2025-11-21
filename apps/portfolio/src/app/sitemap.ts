import type { MetadataRoute } from 'next';

import { getPathname } from '@/features/internationalization/lib/navigation';
import { SITE_BASE_URL } from '@/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = ['/', '/blog'];

  const sitemap: MetadataRoute.Sitemap = urls.map((url: string) => ({
    url: SITE_BASE_URL + url,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        fr: SITE_BASE_URL + getPathname({ locale: 'fr', href: url }),
      },
    },
  }));

  return sitemap;
}
