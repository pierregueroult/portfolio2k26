import { H2 } from '@repo/ui/components/typography/titles';
import { cn } from '@repo/ui/lib/utils';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  variant?: 'timeline' | 'list';
}

export function ResumeSection({ title, children, variant = 'list' }: ResumeSectionProps) {
  return (
    <section className="space-y-6">
      <H2>{title}</H2>
      <div
        className={cn('relative pb-1', {
          'border-l border-muted ml-3': variant === 'timeline',
          'space-y-8': variant === 'list',
          'flex flex-col': variant === 'timeline',
        })}
      >
        {children}
      </div>
    </section>
  );
}
