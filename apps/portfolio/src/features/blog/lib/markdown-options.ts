import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

export function options(): MDXRemoteOptions {
  return {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkToc],
      rehypePlugins: [rehypeAccessibleEmojis],
    },
  };
}
