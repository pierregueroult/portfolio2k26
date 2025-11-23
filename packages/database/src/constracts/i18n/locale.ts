export const locales = [
    {
        slug: 'en',
        dir: 'ltr',
    },
    {
        slug: 'fr',
        dir: 'ltr',
    },
] as const;

export type Locale = (typeof locales)[number]['slug'];
export type LocaleWithDetails = (typeof locales)[number];

export const defaultLocale: LocaleWithDetails = locales[0];

export const localesSlugs: readonly Locale[] = locales.map((l) => l.slug) as readonly Locale[];