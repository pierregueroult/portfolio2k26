import '@repo/ui/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ErrorPage } from '@/features/error/components/error-page';
import { Button } from '@repo/ui/components/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ErrorPage
          code="404"
          title="Page Not Found"
          description="The page you are looking for does not exist."
          withArrow={true}
          actions={
            <Button onClick={() => (window.location.href = '/')} variant="default">
              Go Home
            </Button>
          }
        />
      </body>
    </html>
  );
}
