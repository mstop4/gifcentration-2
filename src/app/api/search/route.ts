import giphyFetch from '../../../../lib/giphySDK';
import { randomIntegerRange } from '../../../../helpers';
import { Rating } from '@giphy/js-fetch-api';
import { NextResponse } from 'next/server';

const maxLimit = 100;

// GET /api/search
// q: string
// limit: string
// rating: Rating
export async function GET(request: Request): Promise<NextResponse> {
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

    const index = randomIntegerRange(0, results.length);
    selection.push(results[index]);
    results.splice(index, 1);
  }

  return NextResponse.json(selection);
}
