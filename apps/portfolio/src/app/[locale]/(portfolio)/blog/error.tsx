'use client';

import { Button } from '@repo/ui/components/button';
import { Link } from '@/features/internationalization/lib/navigation';
import { AlertCircleIcon } from 'lucide-react';

type BlogErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center py-12">
      <div className="text-center space-y-6 px-4 max-w-lg">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <AlertCircleIcon className="size-10 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Failed to load article</h1>
          <p className="text-base text-muted-foreground">
            Something went wrong while loading this blog article. This could be due to a temporary
            issue or the article may have been moved.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-muted rounded-lg p-4 text-left">
            <p className="text-xs font-mono text-muted-foreground break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs font-mono text-muted-foreground/70 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Link href="/blog">
            <Button variant="outline" className="w-full">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
