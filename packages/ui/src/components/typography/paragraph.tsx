import type { ComponentProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

export function Paragraph(props: ComponentProps<'p'>) {
  return (
    <p {...props} className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>
      {props.children}
    </p>
  );
}
