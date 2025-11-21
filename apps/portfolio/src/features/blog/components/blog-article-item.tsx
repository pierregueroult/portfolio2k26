import { Link } from '@/features/internationalization/lib/navigation';
import { cn } from '@repo/ui/lib/utils';

interface BlogArticleItemProps {
  title: string;
  link: string;
  date: string;
  className?: string;
}

export function BlogArticleItem({ title, link, date, className }: BlogArticleItemProps) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/blog/${link}`}
      className={cn(
        'group flex items-baseline justify-between gap-6 py-3 transition-colors hover:text-foreground',
        className,
      )}
    >
      <span className="font-normal text-base group-hover:underline underline-offset-4 decoration-muted-foreground/50">
        {title}
      </span>
      <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
        {formattedDate}
      </span>
    </Link>
  );
}
