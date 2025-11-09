'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';

type ThemeSelectProps = Omit<ComponentProps<typeof Select>, 'value' | 'onChange'>;

const itemsLabels = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

export function ThemeSelect({ ...props }: ThemeSelectProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Select {...props} onValueChange={setTheme} defaultValue={theme}>
      <SelectTrigger>
        <SelectValue>
          {theme ? itemsLabels[theme as keyof typeof itemsLabels] : 'Select Theme'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(itemsLabels).map((key) => (
          <SelectItem key={key} value={key}>
            {itemsLabels[key as keyof typeof itemsLabels]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
