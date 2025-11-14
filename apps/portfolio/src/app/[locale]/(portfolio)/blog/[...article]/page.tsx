import { MDXRemote } from 'next-mdx-remote-client/rsc';

import { MarkdownError } from '@/features/blog/components/error';
import { getArticleContentBySlug } from '@/features/blog/services/content';
import { options } from '@/features/blog/lib/markdown-options';
import { ArticleBreadcrumb } from '@/features/blog/components/breadcrump';

export default async function BlogArticlePage(props: PageProps<'/[locale]/blog/[...article]'>) {
  const { article } = await props.params;

  const result = await getArticleContentBySlug(article);

  return (
    <>
      <ArticleBreadcrumb path={result.data.folder} title={result.data.title} />
      <h1>{result.data.title}</h1>
      <MDXRemote source={result.content} onError={MarkdownError} options={options()} />
    </>
  );
}
