import { env } from '@/env-server';
import { get, getOrThrow } from '@/lib/fetch';
import type { ArticleResponse } from '@repo/database/dtos/blog/article';
import { GetAllImagesResponse } from '@repo/database/dtos/blog/image';

export async function getArticleContentBySlug(slugs: string[]): Promise<ArticleResponse> {
  const slug = slugs.join('/');

  return await getOrThrow<ArticleResponse>(`/blog/article/${slug}`);
}

export async function getArticleImageBySlug(slugs: string[]): Promise<{
  readable: ReadableStream<Uint8Array<ArrayBufferLike>> | null;
  contentType: string;
  cacheControl: string;
}> {
  const slug = slugs.join('/');
  const url = `${env.PORTFOLIO_BACKEND_API_URL}/blog/image/${slug}`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Upstream error');
  }

  const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
  const cacheControl = response.headers.get('cache-control') ?? 'public, max-age=86400';

  return { readable: response.body, contentType, cacheControl };
}

export async function getArticlesImagesDictionary(): Promise<GetAllImagesResponse> {
  const response = await get<GetAllImagesResponse>('/blog/images');

  if (!response.ok) {
    throw new Error('Failed to fetch articles images dictionary');
  }

  return response.data;
}
