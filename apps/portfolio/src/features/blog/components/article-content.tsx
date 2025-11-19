import { MDXRemote } from 'next-mdx-remote-client/rsc';

import { MarkdownError } from '@/features/blog/components/error';
import { getOptions } from '@/features/blog/lib/markdown-options';
import { components } from '@/features/blog/components/markdown';
import { Locale } from '@/features/internationalization/lib/routing';

import '@/features/blog/styles/katex.css';

interface ArticleContentProps {
  content: string;
  locale: Locale;
}

export async function ArticleContent({ content, locale }: ArticleContentProps) {
  const options = await getOptions(locale);

  return (
    <MDXRemote source={content} onError={MarkdownError} options={options} components={components} />
  );
}
