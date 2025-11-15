import { env } from '@/env-server';
import { get, getOrThrow } from '@/lib/fetch';
import { NextResponse } from 'next/server';
import { Stats } from 'node:fs';

export async function getArticleContentBySlug(slugs: string[]) {
  const slug = slugs.join('/');

  return await getOrThrow(`/blog/article/${slug}`);
}

export async function getArticleImageBySlug(slugs: string[]) {
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

export async function getArticlesImagesDictionary() {
  const response = await get('/blog/images');

  if (!response.ok) {
    throw new Error('Failed to fetch articles images dictionary');
  }

  return response.data;
}
