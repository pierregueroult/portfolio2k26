import { assertValidLocaleFromParams } from '@/features/internationalization/lib/utils';
import { generateAlternates } from '@/features/search-engines/lib/generate-alternates';
import { getAllBlogArticles } from '@/features/blog/services/content';
import { BlogArticleItem } from '@/features/blog/components/blog-article-item';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GridPattern } from '@/components/ui/grid-pattern';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await assertValidLocaleFromParams(params);
  const t = await getTranslations({ locale: locale.slug, namespace: 'BlogPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: generateAlternates('/blog'),
  };
}

interface ArticlesByYear {
  [year: string]: Array<{
    title: string;
    link: string;
    date: string;
  }>;
}

export default async function BlogPage() {
  const articles = await getAllBlogArticles();

  const articlesByYear = articles.reduce<ArticlesByYear>((acc, article) => {
    const year = new Date(article.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {});

  const sortedYears = Object.keys(articlesByYear).sort((a, b) => Number(b) - Number(a));

  sortedYears.forEach((year) => {
    const yearArticles = articlesByYear[year];
    if (yearArticles) {
      yearArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  });

  if (articles.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground">No articles published yet.</p>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-16">

      <div className="space-y-16">
        {sortedYears.map((year) => (
          <section key={year} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{year}</h2>
            <div className="space-y-1">
              {articlesByYear[year]?.map((article, index) => (
                <BlogArticleItem
                  key={`${year}-${index}`}
                  title={article.title}
                  link={article.link}
                  date={article.date}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
