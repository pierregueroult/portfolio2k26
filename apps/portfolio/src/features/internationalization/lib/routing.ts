import { defineRouting } from 'next-intl/routing';
import { locales, type Locale, type LocaleWithDetails, localesSlugs, defaultLocale } from "@repo/database/constracts/i18n/locale"

export const routing = defineRouting({
  locales: localesSlugs,
  defaultLocale: defaultLocale.slug,
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: true,
});

export { locales, type Locale, type LocaleWithDetails, localesSlugs };
