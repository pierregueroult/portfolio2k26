import { SITE_BASE_URL } from '@/config';

import { getArticleContentBySlug } from '@/features/blog/services/content';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { Drawing } from '@/features/blog/components/drawing';
import { ArticleHeader } from '@/features/blog/components/article-header';
import { ArticleContent } from '@/features/blog/components/article-content';
import { ArticleStructuredData } from '@/features/blog/components/article-structured-data';
import { countWordsOfMarkdown } from '@/features/blog/lib/utils';

export default async function BlogArticlePage(props: PageProps<'/[locale]/blog/[...article]'>) {
  const { article } = await props.params;
  const locale = await assertValidLocaleFromParams(props.params);
  const result = await getArticleContentBySlug(article);
  const link = `${SITE_BASE_URL}/${locale.slug}/blog/${article.join('/')}`;

  return (
    <>
      {result.type === 'markdown' && (
        <div className="mb-24">
          <ArticleHeader frontmatter={result.frontmatter} article={article} locale={locale.slug} />
          <ArticleContent content={result.article.content} locale={locale.slug} />
        </div>
      )}
      {result.type === 'excalidraw' && (
        <Drawing json={result.drawing.json} content={result.drawing.content} locale={locale.slug} />
      )}
      <ArticleStructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': link,
          mainEntityOfPage: link,
          headline: result.frontmatter.title,
          datePublished: result.frontmatter.date,
          dateModified: result.frontmatter.date,
          author: {
            '@type': 'Person',
            '@id': 'https://pierregueroult.dev/#me',
            name: 'Pierre Gueroult',
            url: SITE_BASE_URL,
          },
          keywords: result.frontmatter.tags || [],
          wordCount: countWordsOfMarkdown(
            result.type === 'markdown' ? result.article.content : result.drawing.content,
          ),
          isPartOf: {
            '@type': 'WebPage',
            '@id': `${SITE_BASE_URL}/${locale.slug}/blog`,
            name: "Pierre Guéroult's Blog",
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.post-summary', 'h1'],
          },
        }}
      />
    </>
  );
}
