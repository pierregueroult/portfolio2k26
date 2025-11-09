import { cn } from '@repo/ui/lib/utils';
import { CSSProperties } from 'react';

type RenderBlurPropsReturn = {
  style: CSSProperties;
  className: string;
};

export function renderBlurProps(className?: string): RenderBlurPropsReturn {
  return {
    style: {
      backdropFilter: 'blur(8px) saturate(2.8) brightness(1.25) contrast(1)',
      boxShadow: `0px 0.5px 0.6px hsl(0 0% 0% / 0.06), 0px 1.8px 2.3px -0.5px hsl(0 0% 0% / 0.07), 0px 4.2px 5.3px -1.1px hsl(0 0% 0% / 0.09), 0px 9.7px 12.1px -1.6px hsl(0 0% 0% / 0.1)`,
      background: 'linear-gradient(light-dark(hsl(0 0% 98%), hsl(0 0% 12%)) 0 100%) padding-box',
    },
    className: cn(
      'pointer-events-auto border-4 border-black/10 dark:border-white:20 rounded-2xl p-2 flex gap-2 h-full items-center',
      className,
    ),
  };
}
