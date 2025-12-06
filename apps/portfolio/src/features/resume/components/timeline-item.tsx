import { cn } from '@repo/ui/lib/utils';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  logoUrl?: string;
  logoAlt?: string;
  isContinuation?: boolean;
  isLastInGroup?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  logoUrl,
  logoAlt,
  isContinuation = false,
  isLastInGroup = false,
}: TimelineItemProps) {
  return (
    <div
      className={cn('relative pl-8', {
        'not-last:mb-12': isLastInGroup,
        'mb-8': !isLastInGroup,
      })}
    >
      {!isContinuation && (
        <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-background bg-muted-foreground ring-4 ring-background" />
      )}
      <div className="flex flex-row gap-4 items-start">
        <div className="flex-shrink-0 w-12">
          {!isContinuation && logoUrl && (
            <img
              src={logoUrl}
              alt={logoAlt || subtitle}
              className="w-12 h-12 rounded-md object-contain border bg-background p-1"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="font-semibold text-lg leading-none">{title}</h3>
            <span className="text-sm text-muted-foreground font-mono text-right min-w-52">
              {date}
            </span>
          </div>
          <div className="text-sm font-medium text-primary/80">{subtitle}</div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1 text-pretty">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
