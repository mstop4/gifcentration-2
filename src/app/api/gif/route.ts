import { NextResponse } from 'next/server';
import giphyFetch from '../../../../lib/giphySDK';
import { checkKey } from '../../../../helpers';

// GET /api/gif
// id: string
export async function GET(request: Request): Promise<NextResponse> {
  if (!process.env.GIFCENTRATION_API_HASH)
    return NextResponse.json(
      { status: '500 Internal Server Error' },
      { status: 500 },
    );

  const key = request.headers.get('x-api-key');
  if (!key)
    return NextResponse.json({ status: '400 Bad Request' }, { status: 400 });

  const result = checkKey(process.env.GIFCENTRATION_API_HASH, key);
  if (!result)
    return NextResponse.json({ status: '403 Forbidden' }, { status: 403 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') ?? '';

    const { data: gif } = await giphyFetch.gif(id);

    return NextResponse.json(gif);
  } catch (err) {
    console.log('Error in api/gif', err);
    return NextResponse.json(
      { status: '500 Internal Server Error' },
      { status: 500 },
    );
  }
}
