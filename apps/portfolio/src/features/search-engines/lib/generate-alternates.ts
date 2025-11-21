import { Locale, locales } from '@/features/internationalization/lib/routing';
import { buildLink } from '@/features/search-engines/lib/build-link';

export const generateAlternates = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const enUrl = buildLink('en', normalizedPath);

  const languages = locales
    .filter((locale) => locale.slug !== 'en')
    .reduce<Record<Locale, string>>(
      (acc, locale) => {
        acc[locale.slug] = buildLink(locale.slug, normalizedPath);
        return acc;
      },
      {} as Record<Locale, string>,
    );

  return {
    canonical: enUrl,
    languages,
  };
};
