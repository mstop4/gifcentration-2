import { NextResponse } from 'next/server';
import giphyFetch from '../../../../lib/giphySDK';

// GET /api/gif
// id: string
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') ?? '';

  const { data: result } = await giphyFetch.gif(id);

  return NextResponse.json(result);
}
