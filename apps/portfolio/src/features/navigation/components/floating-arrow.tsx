import { ArrowUpIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface FloatingArrowProps {
  message: string;
  className?: string;
}

export function FloatingArrow({ message, className }: FloatingArrowProps) {
  return (
    <div
      className={cn(
        'absolute top-8 left-1/2 -translate-x-1/2 md:top-auto md:bottom-0 md:translate-x-0 animate-bounce',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground md:flex-col-reverse">
        <ArrowUpIcon className="size-6 md:rotate-180" />
        <p className="text-sm font-medium max-w-[200px] text-center">{message}</p>
      </div>
    </div>
  );
}
