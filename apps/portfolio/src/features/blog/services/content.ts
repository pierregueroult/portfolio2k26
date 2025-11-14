import { get, getOrThrow } from '@/lib/fetch';

export async function getArticleContentBySlug(slugs: string[]) {
  const slug = slugs.join('/');

  return await getOrThrow(`/blog/article/${slug}`);
}

export async function getArticleImageBySlug(slugs: string[]) {
  const slug = slugs.join('/');

  return await getOrThrow(`/blog/image/${slug}`);
}

export async function getArticlesImagesDictionary() {
  const response = await get('/blog/images');

  if (!response.ok) {
    throw new Error('Failed to fetch articles images dictionary');
  }

  return response.data;
}
