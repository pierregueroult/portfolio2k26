import { defineRouting } from 'next-intl/routing';

export const locales = [
  {
    slug: 'en',
    dir: 'ltr',
    name: 'English',
  },
  {
    slug: 'fr',
    dir: 'ltr',
    name: 'Français',
  },
] as const;

export type Locale = (typeof locales)[number]['slug'];

export const localesSlugs: readonly Locale[] = locales.map((l) => l.slug) as readonly Locale[];

export const routing = defineRouting({
  locales: localesSlugs,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: true,
});
