import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: RouteContext<'/[locale]/blog/images/[...image]'>,
) {
  const { image } = await params;

  // TODO: Implement image retrieval logic
  throw new Error('Image retrieval logic not implemented');
}
