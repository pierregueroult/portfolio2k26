import { cn } from '@repo/ui/lib/utils';
import type { ComponentProps } from 'react';

export function H1(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'scroll-m-20 text-balance text-center text-4xl font-extrabold tracking-tight',
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
}

export function H2(props: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
}

export function H3(props: ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.className)}
    >
      {props.children}
    </h3>
  );
}

export function H4(props: ComponentProps<'h4'>) {
  return (
    <h4
      {...props}
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight', props.className)}
    >
      {props.children}
    </h4>
  );
}
