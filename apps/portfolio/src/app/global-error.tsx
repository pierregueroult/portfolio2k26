'use client';

import { useEffect } from 'react';
import { Button } from '@repo/ui/components/button';
import { Inter } from 'next/font/google';
import '@repo/ui/styles/globals.css';
import { ErrorPage } from '@/features/error/components/error-page';
import { AlertTriangleIcon } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ErrorPage
          code="500"
          title="Something went wrong"
          description="A critical error occurred. Please try refreshing the page."
          icon={<AlertTriangleIcon className="size-16 text-destructive" />}
          actions={
            <>
              <Button onClick={() => reset()} variant="default">
                Try again
              </Button>
              <Button onClick={() => (window.location.href = '/')} variant="outline">
                Go Home
              </Button>
            </>
          }
        >
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="bg-muted rounded-lg p-4 text-left max-w-lg mx-auto">
              <p className="text-xs font-mono text-muted-foreground break-all">{error.message}</p>
            </div>
          )}
        </ErrorPage>
      </body>
    </html>
  );
}
