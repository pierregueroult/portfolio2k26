import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';

import { ThemeProvider } from '@/features/themes/components/provider';
import { I18nProvider } from '@/features/internationalization/components/provider';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { fonts, readFontFromCookies } from '@/features/settings/lib/fonts';
import { readThemeFromCookies } from '@/features/themes/lib/theme';
import { MeStructuredData } from '@/features/search-engines/components/me-strutured-data';
import { Toaster } from '@repo/ui/components/sonner';
import { createViewportForTheme } from '@/features/themes/lib/viewport';
import { SITE_BASE_URL } from '@/config';

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'LocaleLayout.metadata' });

  return {
    title: {
      template: `%s — ${t('titlePattern')}`,
      default: t('titleDefault'),
    },
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      locale: locale.slug,
      type: 'website',
    },
    twitter: {
      title: t('twitter.title'),
      description: t('twitter.description'),
      site: '@pierregueroult1',
      card: 'summary',
    },
    metadataBase: `${SITE_BASE_URL}/${locale.slug}`,
  };
}

export async function generateViewport(): Promise<Viewport> {
  const theme = await readThemeFromCookies();
  return createViewportForTheme(theme);
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await assertValidLocaleFromParams(params);
  const font = await readFontFromCookies();

  return (
    <html lang={locale.slug} dir={locale.dir} suppressHydrationWarning>
      <head>
        <MeStructuredData />
      </head>
      <body className={`font-sans antialiased ${fonts}`} data-font={font}>
        <ThemeProvider>
          <I18nProvider>
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
