import { routing } from '@/features/internationalization/lib/routing';
import { formats } from '@/features/internationalization/lib/request';

import messages from '../../../../../packages/i18n/messages/en.d.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
