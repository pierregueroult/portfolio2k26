export function ArticleContentSkeleton() {
  return (
    <article className="space-y-6">
      {/* Paragraph blocks */}
      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-5/6" />
      </div>

      {/* Heading Skeleton */}
      <div className="h-8 bg-muted animate-pulse rounded-md max-w-md mt-8" />

      {/* More paragraph blocks */}
      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-4/5" />
      </div>

      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
      </div>

      {/* Code block skeleton */}
      <div className="h-48 bg-muted animate-pulse rounded-lg" />

      {/* More paragraph blocks */}
      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-5/6" />
      </div>

      {/* Another heading */}
      <div className="h-8 bg-muted animate-pulse rounded-md max-w-sm mt-8" />

      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-4/5" />
      </div>

      {/* List items skeleton */}
      <div className="space-y-2 pl-6">
        <div className="h-4 bg-muted animate-pulse rounded-md w-11/12" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-10/12" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-11/12" />
      </div>

      {/* Final paragraph */}
      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-2/3" />
      </div>
    </article>
  );
}
