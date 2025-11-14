import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';

import { remarkWikiLinks } from '@/features/blog/lib/remark-wiki-link';
import { Locale } from '@/features/internationalization/lib/routing';
import { remarkWikiImage } from './remark-wiki-image';
import { get } from '@/lib/fetch';
import { getArticlesImagesDictionary } from '../services/content';

export async function getOptions(locale: Locale): Promise<MDXRemoteOptions> {
  const imageDictionary = await getArticlesImagesDictionary();

  return {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkToc,
        [remarkWikiLinks, { prefix: `/${locale}/blog/` }],
        [
          remarkWikiImage,
          {
            prefix: `/${locale}/blog/images/`,
            dictionary: imageDictionary,
          },
        ],
      ],
      rehypePlugins: [rehypeAccessibleEmojis],
    },
  };
}
