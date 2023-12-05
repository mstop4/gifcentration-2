import { NextResponse } from 'next/server';
import giphyFetch from '../../../../lib/giphySDK';
import { getCache } from '../../../../lib/redis';
import { checkKey, randomIntegerRange } from '../../../../helpers';
import serverConfig from '../../../../config/serverConfig';
import type { Rating } from '@giphy/js-fetch-api';
import dbConnect from '../../../../lib/mongodb/connect';
import Search from '../../../../lib/mongodb/models/Search';
import { isObscene } from '../../../../helpers/obscenityFilter';

const { maxLimit, cacheExpiryTime } = serverConfig.api.search;

// GET /api/search
// q: string
// limit: string
// rating: Rating
export async function GET(request: Request): Promise<NextResponse> {
  if (!process.env.GIFCENTRATION_API_HASH)
    return NextResponse.json(
      { status: 'Internal Server Error' },
      { status: 500 },
    );

  const key = request.headers.get('x-api-key');
  if (!key)
    return NextResponse.json({ status: 'Bad Request' }, { status: 400 });

  const result = checkKey(process.env.GIFCENTRATION_API_HASH, key);
  if (!result)
    return NextResponse.json({ status: 'Forbidden' }, { status: 403 });

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? '';
    const rating = (searchParams.get('rating') ?? 'g') as Rating;
    const limit = parseInt(searchParams.get('limit') ?? '9');
    let results;

    const cache = await getCache();
    const queryIsCached =
      cache !== null && (await cache.exists(`query:${q}:${rating}`));

    if (queryIsCached) {
      // Get cached search results from Redis
      const jsonStr = await cache.get(`query:${q}:${rating}`);
      results = jsonStr ? JSON.parse(jsonStr) : [];
    } else {
      // Get fresh search results from Giphy and cache it
      const fetchResults = await giphyFetch.search(q, {
        sort: 'relevant',
        limit: maxLimit,
        rating,
      });

      results = fetchResults.data;
      if (cache !== null) {
        await cache.set(`query:${q}:${rating}`, JSON.stringify(results), {
          EX: cacheExpiryTime,
        });
      }
    }

    // Take a random sample of `limit` gifs from results
    const selection = [];
    for (let i = 0; i < limit; i++) {
      // All gone :(
      if (results.length === 0) break;

      const index: number = randomIntegerRange(0, results.length);
      selection.push(results[index]);
      results.splice(index, 1);
    }

    // Track search on db if there are results
    if (selection.length > 0) {
      await dbConnect();

      const lowercaseQuery = q.toLowerCase();
      const obscene = isObscene(lowercaseQuery);

      const search = new Search({
        query: lowercaseQuery,
        rating,
        isObscene: obscene,
      });
      await search.save();
    }

    return NextResponse.json(selection);
  } catch (err) {
    console.log('Error in api/search', err);
    return NextResponse.json(
      { status: err.statusText ?? 'Internal Server Error' },
      { status: err.status ?? 500 },
    );
  }
}
