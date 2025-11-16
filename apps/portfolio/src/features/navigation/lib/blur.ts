import { cn } from '@repo/ui/lib/utils';
import type { CSSProperties } from 'react';

type RenderBlurPropsReturn = {
  style: CSSProperties;
  className: string;
};

export function renderBlurProps(className?: string): RenderBlurPropsReturn {
  return {
    style: {
      backdropFilter: 'blur(8px) saturate(2.8) brightness(1.25) contrast(1)',
      background:
        'linear-gradient(light-dark(hsl(0 0% 98%), hsl(0 0% 12%)) 0 100%) padding-box padding-box',
    },
    className: cn(
      'pointer-events-auto border-4 border-black/10 dark:border-white:20 rounded-2xl p-2 flex gap-2 h-full items-center navigation-shadow',
      className,
    ),
  };
}
