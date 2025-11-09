import { ThemeProvider } from '@/features/themes/components/provider';
import { I18nProvider } from '@/features/internationalization/components/provider';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { openDyslexic, readFontFromCookies } from '@/features/settings/lib/fonts';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await assertValidLocaleFromParams(params);
  const font = await readFontFromCookies();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${openDyslexic.variable}`}
        data-font={font}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
