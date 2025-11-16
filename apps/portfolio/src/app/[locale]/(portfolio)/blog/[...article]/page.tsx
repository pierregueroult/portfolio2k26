import { MDXRemote } from 'next-mdx-remote-client/rsc';

import { MarkdownError } from '@/features/blog/components/error';
import { getArticleContentBySlug } from '@/features/blog/services/content';
import { getOptions } from '@/features/blog/lib/markdown-options';
import { ArticleBreadcrumb } from '@/features/blog/components/breadcrump';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { components } from '@/features/blog/components/markdown';
import { capitalize } from '@/lib/capitalize';
import { Separator } from '@repo/ui/components/separator';
import { ShareButton } from '@/features/blog/components/share-button';
import { SITE_BASE_URL } from '@/config';
import { CopyLinkButton } from '@/features/blog/components/copy-link-button';
import { PrintButton } from '@/features/blog/components/print-button';
import { ReadButton } from '@/features/blog/components/read-button';

export default async function BlogArticlePage(props: PageProps<'/[locale]/blog/[...article]'>) {
  const { article } = await props.params;

  const locale = await assertValidLocaleFromParams(props.params);
  const result = await getArticleContentBySlug(article);
  const options = await getOptions(locale.slug);

  return (
    <>
      <header className="space-y-4 my-16">
        <ArticleBreadcrumb path={result.data.folder} title={result.data.title} />
        <h1 className="text-7xl font-bold tracking-tight">{capitalize(result.data.title)}</h1>
        <div className="flex items-center gap-2">
          <ShareButton
            url={`${SITE_BASE_URL}/${locale.slug}/blog/${article.join('/')}`}
            title={result.data.title}
          />
          <PrintButton />
          <ReadButton markdown={result.content} />
          <CopyLinkButton url={`${SITE_BASE_URL}/${locale.slug}/blog/${article.join('/')}`} />
        </div>
        <Separator className="bg-foreground" />
      </header>
      <MDXRemote
        source={result.content}
        onError={MarkdownError}
        options={options}
        components={components}
      />
    </>
  );
}
