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
      <span className="relative font-normal text-base">
        {title}
        <span className="absolute left-0 top-full block h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
      </span>
      <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
        {formattedDate}
      </span>
    </Link>
  );
}
