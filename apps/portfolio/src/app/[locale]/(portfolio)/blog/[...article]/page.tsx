import type { Metadata } from 'next';
import { SITE_BASE_URL } from '@/config';

import { getArticleContentBySlug } from '@/features/blog/services/content';
import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { Drawing } from '@/features/blog/components/drawing';
import { ArticleHeader } from '@/features/blog/components/article-header';
import { ArticleContent } from '@/features/blog/components/article-content';
import { ArticleStructuredData } from '@/features/blog/components/article-structured-data';
import { countWordsOfMarkdown } from '@/features/blog/lib/utils';
import { isoDate } from '@/lib/date';
import { generateAlternates } from '@/features/search-engines/lib/generate-alternates';
import { buildLink } from '@/features/search-engines/lib/build-link';
import { capitalize } from '@/lib/capitalize';

export async function generateMetadata(
  props: PageProps<'/[locale]/blog/[...article]'>,
): Promise<Metadata> {
  const { article } = await props.params;
  const locale = await assertValidLocaleFromParams(props.params);
  const result = await getArticleContentBySlug(article);
  const path = `/blog/${article.join('/')}`;
  const link = buildLink(locale.slug, path);

  return {
    title: capitalize(result.frontmatter.title),
    description: result.frontmatter.description,
    keywords: result.frontmatter.tags || [],
    robots: {
      index: result.frontmatter.visibility === 'public',
      follow: true,
      nocache: false,
    },
    openGraph: {
      type: 'article',
      url: link,
      title: capitalize(result.frontmatter.title),
      description: result.frontmatter.description,
      modifiedTime: isoDate(result.frontmatter.date),
      publishedTime: isoDate(result.frontmatter.date),
      locale: locale.slug,
      tags: result.frontmatter.tags || [],
      authors: 'Pierre Guéroult',
    },
    authors: {
      name: 'Pierre Guéroult',
      url: 'https://pierregueroult.dev',
    },
    alternates: {
      canonical: link,
      languages: generateAlternates(path),
    },
    twitter: {
      card: 'summary',
      site: '@pierregueroult1',
      creator: '@pierregueroult1',
      title: result.frontmatter.title,
      description: result.frontmatter.description,
    },
  };
}

export default async function BlogArticlePage(props: PageProps<'/[locale]/blog/[...article]'>) {
  const { article } = await props.params;
  const locale = await assertValidLocaleFromParams(props.params);
  const result = await getArticleContentBySlug(article);
  const link = buildLink(locale.slug, `/blog/${article.join('/')}`);

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
            '@id': link,
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
