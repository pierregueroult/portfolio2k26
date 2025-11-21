export default function BlogLoading() {
  return (
    <div className="py-12 md:py-16">
      <div className="space-y-16">
        {/* Year 1 Skeleton */}
        <section className="space-y-6">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          <div className="space-y-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3">
                <div className="h-5 bg-muted animate-pulse rounded-md flex-1 max-w-md" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded-md flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Year 2 Skeleton */}
        <section className="space-y-6">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          <div className="space-y-1">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3">
                <div className="h-5 bg-muted animate-pulse rounded-md flex-1 max-w-sm" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded-md flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
