import { ArticleHeaderSkeleton } from '@/features/blog/components/article-header-skeleton';
import { ArticleContentSkeleton } from '@/features/blog/components/article-content-skeleton';

export default function ArticleLoading() {
  return (
    <div className="mb-24">
      <ArticleHeaderSkeleton />
      <ArticleContentSkeleton />
    </div>
  );
}
