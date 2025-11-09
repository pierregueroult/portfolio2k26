'use client';
import { useEffect, useState, type ComponentProps } from 'react';
import { Switch } from '@repo/ui/components/switch';
import { FontType } from '../types/fonts';

type SwitchProps = Omit<ComponentProps<typeof Switch>, 'checked' | 'onChange'>;

export function FontSwitch(props: SwitchProps) {
  const [font, setFont] = useState<FontType>(() =>
    typeof window !== 'undefined' && localStorage.getItem('font') === 'dyslexic'
      ? 'dyslexic'
      : 'default',
  );

  useEffect(() => {
    document.cookie = `font=${font}; path=/; max-age=31536000`;
    document.body.dataset.font = font;
    localStorage.setItem('font', font);
  }, [font]);

  return (
    <Switch
      {...props}
      checked={font === 'dyslexic'}
      onCheckedChange={() => setFont(font === 'dyslexic' ? 'default' : 'dyslexic')}
    />
  );
}
