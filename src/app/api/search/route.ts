import giphyFetch from '../../../../lib/giphySDK';
import { checkKey, randomIntegerRange } from '../../../../helpers';
import { Rating } from '@giphy/js-fetch-api';
import { NextResponse } from 'next/server';

const maxLimit = 100;

// GET /api/search
// q: string
// limit: string
// rating: Rating
export async function GET(request: Request): Promise<NextResponse> {
  if (!process.env.GIFCENTRATION_API_HASH)
    return NextResponse.json(
      { status: '500 Internal Server Error' },
      { status: 500 }
    );

  const key = request.headers.get('x-api-key');
  if (!key)
    return NextResponse.json({ status: '400 Bad Request' }, { status: 400 });

  const result = checkKey(process.env.GIFCENTRATION_API_HASH, key);
  if (!result)
    return NextResponse.json({ status: '403 Forbidden' }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  const rating = (searchParams.get('rating') ?? 'g') as Rating;
  const limit = parseInt(searchParams.get('limit') ?? '9');

  const { data: results } = await giphyFetch.search(q, {
    sort: 'relevant',
    limit: maxLimit,
    rating,
  });

  const selection = [];
  for (let i = 0; i < limit; i++) {
    // All gone :(
    if (results.length === 0) break;

    const index: number = randomIntegerRange(0, results.length);
    selection.push(results[index]);
    results.splice(index, 1);
  }

  return NextResponse.json(selection);
}
