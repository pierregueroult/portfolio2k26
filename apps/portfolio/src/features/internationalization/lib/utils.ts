import { notFound } from 'next/navigation';
import {
  Locale,
  locales,
  LocaleWithDetails,
  routing,
} from '@/features/internationalization/lib/routing';

export function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && routing.locales.includes(locale as Locale);
}

export async function assertValidLocaleFromParams(
  paramsPromise: Promise<{ locale?: string }>,
): Promise<LocaleWithDetails> {
  const { locale } = await paramsPromise;
  return locales.find((l) => l.slug === locale) || notFound();
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
