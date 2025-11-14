import { getOrThrow } from '@/lib/fetch';

export async function getArticleContentBySlug(slugs: string[]) {
  const slug = slugs.join('/');

  return await getOrThrow(`/blog/article/${slug}`);
}
