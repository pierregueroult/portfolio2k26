import { getArticleImageBySlug } from '@/features/blog/services/content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: RouteContext<'/[locale]/blog/images/[...image]'>,
) {
  const { image } = await params;

  const { readable, contentType, cacheControl } = await getArticleImageBySlug(image);

  return new NextResponse(readable, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
