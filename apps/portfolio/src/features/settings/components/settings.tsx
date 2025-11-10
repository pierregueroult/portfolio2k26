import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';
import { renderBlurProps } from '@/features/navigation/lib/blur';
import { FontSwitch } from './font-switch';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@repo/ui/components/field';
import { ThemeSelect } from '@/features/themes/components/select';
import { LocaleSelect } from '@/features/internationalization/components/select';
import { useTranslations } from 'next-intl';

type SettingsPopoverProps = {
  children: ReactNode;
};

export function SettingsPopover({ children }: SettingsPopoverProps) {
  const t = useTranslations('SettingsPopover');
  return (
    <Popover>
      <PopoverTrigger asChild={true}>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={32}
        {...renderBlurProps('relative right-2.5 w-[25rem] p-4')}
      >
        <FieldSet className="w-full gap-3">
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel>{t('theme.label')}</FieldLabel>
              <FieldDescription>{t('theme.description')}</FieldDescription>
            </FieldContent>
            <ThemeSelect />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel>{t('language.label')}</FieldLabel>
              <FieldDescription>{t('language.description')}</FieldDescription>
            </FieldContent>
            <LocaleSelect />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel htmlFor="font">{t('dislexia.label')}</FieldLabel>
              <FieldDescription>{t('dislexia.description')}</FieldDescription>
            </FieldContent>
            <FontSwitch id="font" />
          </Field>
        </FieldSet>
      </PopoverContent>
    </Popover>
  );
}
