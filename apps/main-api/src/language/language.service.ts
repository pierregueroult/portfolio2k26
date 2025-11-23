import { Injectable, OnModuleInit } from '@nestjs/common';

import { locales, type Locale, defaultLocale } from '@repo/database/constracts/i18n/locale';
import { MessageKeyMap } from '@repo/database/constracts/i18n/messages';

type LanguageMessagesStructure = MessageKeyMap;

@Injectable()
export class LanguageService implements OnModuleInit {
    private messagesMap: Record<Locale, LanguageMessagesStructure> = {} as Record<
        Locale,
        LanguageMessagesStructure
    >;

    async onModuleInit() {
        const loaders: Record<Locale, () => Promise<LanguageMessagesStructure>> = {
            en: () => import('@repo/i18n/messages/en.json').then((mod) => mod.default),
            fr: () => import('@repo/i18n/messages/fr.json').then((mod) => mod.default),
        };

        for (const locale of locales) {
            this.messagesMap[locale.slug] = await loaders[locale.slug]();
        }
    }

    getLanguage(locale: Locale): LanguageMessagesStructure {
        const messages = this.messagesMap[locale] ?? this.messagesMap[defaultLocale.slug];
        if (!messages) {
            throw new Error(
                `No messages found for locale: ${locale} or default locale: ${defaultLocale.slug}`,
            );
        }
        return messages;
    }

    getAvailableLanguages() {
        return locales;
    }

    getDefaultLanguage() {
        return defaultLocale;
    }

    getAsString(data: LanguageMessagesStructure): string {
        return JSON.stringify(data);
    }
}