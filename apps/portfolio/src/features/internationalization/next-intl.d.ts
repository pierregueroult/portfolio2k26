import { routing } from '@/features/internationalization/lib/routing';
import { formats } from '@/features/internationalization/lib/request';
import type messages from '@/features/internationalization/messages/en.d.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
