import { Separator } from '@repo/ui/components/separator';

export function ArticleHeaderSkeleton() {
  return (
    <header className="space-y-4 my-16">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-1 bg-muted animate-pulse" />
        <div className="h-4 w-20 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-1 bg-muted animate-pulse" />
        <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-3">
        <div className="h-16 bg-muted animate-pulse rounded-md max-w-2xl" />
        <div className="h-16 bg-muted animate-pulse rounded-md max-w-lg" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-10 bg-muted animate-pulse rounded-md" />
        ))}
      </div>

      <Separator className="bg-muted" />
    </header>
  );
}
