import { env } from '@/env-server';
import { get, getOrThrow } from '@/lib/fetch';
import type { ArticleResponse } from '@repo/database/dtos/blog/article';
import { GetAllImagesResponse } from '@repo/database/dtos/blog/image';
import { notFound } from 'next/navigation';

export async function getArticleContentBySlug(slugs: string[]): Promise<ArticleResponse> {
  const slug = slugs.join('/');

  return await getOrThrow<ArticleResponse>(`/blog/article/${slug}`);
}

export async function getArticleImageBySlug(slugs: string[]): Promise<{
  readable: ReadableStream<Uint8Array<ArrayBufferLike>>;
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

  if (response.body === null) {
    return notFound();
  }

  const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
  const cacheControl = response.headers.get('cache-control') ?? 'public, max-age=86400';

  return { readable: response.body, contentType, cacheControl };
}

export async function getArticleDocumentBySlug(slugs: string[]): Promise<{
  pdf: ReadableStream<Uint8Array<ArrayBufferLike>>;
  filename: string;
}> {
  const slug = slugs.join('/');
  const url = `${env.PORTFOLIO_BACKEND_API_URL}/blog/document/${slug}`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Upstream error');
  }

  if (response.body === null) {
    return notFound();
  }

  const filename =
    response.headers.get('content-disposition')?.match(/filename="([^"]+)"/)?.[1] ?? 'document.pdf';

  return { pdf: response.body, filename };
}

export async function getArticlesImagesDictionary(): Promise<GetAllImagesResponse> {
  const response = await get<GetAllImagesResponse>('/blog/images');

  if (!response.ok) {
    throw new Error('Failed to fetch articles images dictionary');
  }

  return response.data;
}

export interface ArticleSummary {
  title: string;
  link: string;
  date: string;
}

export async function getAllBlogArticles(): Promise<ArticleSummary[]> {
  return await getOrThrow<ArticleSummary[]>('/blog/articles/for-blog');
}

import { TreeNode } from '@repo/database/dtos/blog/tree';

export async function getBlogTree(): Promise<TreeNode[]> {
  return await getOrThrow<TreeNode[]>('/blog/tree');
}
