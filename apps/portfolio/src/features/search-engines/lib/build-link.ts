import { SITE_BASE_URL } from '@/config';

export function buildLink(locale: string, path: string): string {
  const localeSlug = `/${locale}`;
  return `${SITE_BASE_URL}${localeSlug}${path}`;
}
