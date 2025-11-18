import { getArticleDocumentBySlug } from '@/features/blog/services/content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: RouteContext<'/[locale]/blog/documents/[...document]'>,
) {
  const { document } = await params;

  const { pdf, filename } = await getArticleDocumentBySlug(document);

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
}
