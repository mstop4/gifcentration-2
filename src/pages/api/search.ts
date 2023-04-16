import { NextApiRequest, NextApiResponse } from 'next';
import giphyFetch from '../../../lib/giphySDK';
import { randomIntegerRange } from '../../../helpers';

type SearchQuery = {
  q: string;
  limit: string;
};

const maxLimit = 100;

// GET /api/search
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { q, limit } = <SearchQuery>req.query;
  const limitInt = parseInt(limit);

  const { data: results } = await giphyFetch.search(q, {
    sort: 'relevant',
    limit: maxLimit,
  });

  const selection = [];
  for (let i = 0; i < limitInt; i++) {
    const index = randomIntegerRange(0, results.length);
    selection.push(results[index]);
    results.splice(index, 1);
  }

  res.status(200).json(selection);
}
