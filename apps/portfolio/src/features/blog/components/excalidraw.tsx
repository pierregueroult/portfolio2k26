'use client';

import type { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Excalidraw as BaseComponent } from '@excalidraw/excalidraw';

const DynamicExcalidraw = dynamic(async () => (await import('./excalidraw-client')).default, {
  ssr: false,
});

type ExcalidrawProps = Omit<ComponentProps<typeof BaseComponent>, 'theme'>;

export function Excalidraw(props: ExcalidrawProps) {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme: 'light' | 'dark' =
    (theme === 'system' ? systemTheme : theme) === 'dark' ? 'dark' : 'light';

  return <DynamicExcalidraw {...props} theme={resolvedTheme} />;
}
