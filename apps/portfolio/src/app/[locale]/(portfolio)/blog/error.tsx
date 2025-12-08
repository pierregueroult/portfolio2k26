'use client';

import { Button } from '@repo/ui/components/button';
import { Link } from '@/features/internationalization/lib/navigation';
import { AlertCircleIcon } from 'lucide-react';
import { ErrorPage } from '@/features/error/components/error-page';

type BlogErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <ErrorPage
      code="500"
      title="Failed to load article"
      description="Something went wrong while loading this blog article. This could be due to a temporary issue or the article may have been moved."
      icon={<AlertCircleIcon className="size-16 text-muted-foreground" />}
      actions={
        <>
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Link href="/blog">
            <Button variant="outline" className="w-full">
              Back to Blog
            </Button>
          </Link>
        </>
      }
    >
      {process.env.NODE_ENV === 'development' && error.message && (
        <div className="bg-muted rounded-lg p-4 text-left max-w-lg mx-auto">
          <p className="text-xs font-mono text-muted-foreground break-all">{error.message}</p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground/70 mt-2">
              Digest: {error.digest}
            </p>
          )}
        </div>
      )}
    </ErrorPage>
  );
}
