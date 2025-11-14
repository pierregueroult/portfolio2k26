'use client';
import { type ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { useTheme } from '@/features/themes/hooks/use-theme';
import { type Theme, themes } from '@/features/themes/types/theme';

type ThemeSelectProps = Omit<ComponentProps<typeof Select>, 'value' | 'onChange'>;

export function ThemeSelect({ ...props }: ThemeSelectProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('ThemeSelect');

  return (
    <Select {...props} onValueChange={setTheme} defaultValue={theme}>
      <SelectTrigger>
        <SelectValue>{theme ? t(`options.${theme}`) : t('label')}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {themes.map((value) => (
          <SelectItem key={value} value={value}>
            {t(`options.${value}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
