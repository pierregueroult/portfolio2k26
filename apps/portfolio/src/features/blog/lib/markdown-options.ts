import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';

import { remarkWikiLinks } from '@/features/blog/lib/remark-wiki-link';
import { Locale } from '@/features/internationalization/lib/routing';
import { remarkWikiImage } from './remark-wiki-image';
import { getArticlesImagesDictionary } from '../services/content';
import { remarkWikiPdf } from './remark-wiki-pdf';

export async function getOptions(locale: Locale): Promise<MDXRemoteOptions> {
  const imageDictionary = await getArticlesImagesDictionary();

  return {
    mdxOptions: {
      remarkRehypeOptions: {
        allowDangerousHtml: true,
      },
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
        [remarkWikiPdf, { prefix: `/${locale}/blog/documents/` }],
      ],
      rehypePlugins: [rehypeRaw, rehypeAccessibleEmojis],
    },
  };
}
