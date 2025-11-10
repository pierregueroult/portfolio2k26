'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { useTransition, type ComponentProps } from 'react';
import { Locale, locales } from '../lib/routing';
import { usePathname, useRouter, useLocale } from '../lib/navigation';
import { useTranslations } from 'next-intl';

type LocaleSelectProps = Omit<ComponentProps<typeof Select>, 'value' | 'onValueChange'>;

export function LocaleSelect(props: LocaleSelectProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('LocaleSelect');

  const selectedLocale = locales.find((item) => item.slug === locale);

  function onValueChange(value: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale: value as Locale });
    });
  }

  return (
    <Select {...props} onValueChange={onValueChange} disabled={isPending} defaultValue={locale}>
      <SelectTrigger>
        <SelectValue>
          {selectedLocale ? t(`options.${selectedLocale.slug}`) : t('label')}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((item) => (
          <SelectItem key={item.slug} value={item.slug}>
            {t(`options.${item.slug}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
