import { Link } from '@/features/internationalization/lib/navigation';
import { FloatingArrow } from '@/features/navigation/components/floating-arrow';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center relative">
      {/* Floating arrow pointing to navigation */}
      <FloatingArrow message="Some articles have been moved" />

      {/* Main 404 content */}
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">Page not found</p>
        </div>

        <p className="text-base text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
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
        </div>
      </div>
    </div>
  );
}
