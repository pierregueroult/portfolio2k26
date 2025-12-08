import { Link } from '@/features/internationalization/lib/navigation';
import { ErrorPage } from '@/features/error/components/error-page';

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      withArrow={true}
      actions={
        <>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-colors rounded-lg border border-border hover:bg-accent hover:text-accent-foreground"
          >
            View Blog
          </Link>
        </>
      }
    />
  );
}
