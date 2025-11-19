import { Separator } from '@repo/ui/components/separator';

import { SITE_BASE_URL } from '@/config';
import { capitalize } from '@/lib/capitalize';

import { ArticleBreadcrumb } from '@/features/blog/components/breadcrump';
import { ShareButton } from '@/features/blog/components/buttons/share-button';
import { CopyLinkButton } from '@/features/blog/components/buttons/copy-link-button';
import { PrintButton } from '@/features/blog/components/buttons/print-button';
import { ReadButton } from '@/features/blog/components/buttons/read-button';

interface ArticleHeaderProps {
  frontmatter: {
    title: string;
    folder: string;
  };
  article: string[];
  locale: string;
}

export function ArticleHeader({ frontmatter, article, locale }: ArticleHeaderProps) {
  const articleUrl = `${SITE_BASE_URL}/${locale}/blog/${article.join('/')}`;

  return (
    <header className="space-y-4 my-16">
      <ArticleBreadcrumb path={frontmatter.folder} title={frontmatter.title} />

      <h1 className="text-7xl font-bold tracking-tight">{capitalize(frontmatter.title)}</h1>

      <div className="flex items-center gap-2">
        <ShareButton url={articleUrl} title={frontmatter.title} />
        <PrintButton />
        <ReadButton markdown={frontmatter.title} />
        <CopyLinkButton url={articleUrl} />
      </div>

      <Separator className="bg-foreground" />
    </header>
  );
}
