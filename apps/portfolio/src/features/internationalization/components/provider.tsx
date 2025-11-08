import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};
