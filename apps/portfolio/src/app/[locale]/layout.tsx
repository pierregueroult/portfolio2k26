import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';

import { ThemeProvider } from '@/features/themes/components/provider';
import { I18nProvider } from '@/features/internationalization/components/provider';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { fonts, readFontFromCookies } from '@/features/settings/lib/fonts';
import { readThemeFromCookies } from '@/features/themes/lib/theme';
import { MeStructuredData } from '@/features/search-engines/components/me-strutured-data';

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'LocaleLayout.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export async function generateViewport(): Promise<Viewport> {
  const theme = await readThemeFromCookies();

  const COLORS = {
    light: '#f5f5f5',
    dark: '#262626',
  };

  if (!theme || theme === 'system') {
    return {
      themeColor: [
        { color: COLORS.light, media: '(prefers-color-scheme: light)' },
        { color: COLORS.dark, media: '(prefers-color-scheme: dark)' },
      ],
    };
  }

  const color = COLORS[theme];
  return {
    themeColor: [
      { color, media: '(prefers-color-scheme: light)' },
      { color, media: '(prefers-color-scheme: dark)' },
    ],
    colorScheme: theme === 'light' ? 'light' : 'dark',
  };
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
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
