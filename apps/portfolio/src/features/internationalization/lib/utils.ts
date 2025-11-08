import { notFound } from 'next/navigation';
import { Locale, routing } from '@/features/internationalization/lib/routing';

export function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && routing.locales.includes(locale as Locale);
}

export async function assertValidLocaleFromParams(
  paramsPromise: Promise<{ locale?: string }>,
): Promise<Locale> {
  const { locale } = await paramsPromise;
  if (!isValidLocale(locale)) notFound();
  return locale!;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
