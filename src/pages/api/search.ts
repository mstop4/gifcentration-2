import { NextApiRequest, NextApiResponse } from 'next';
import giphyFetch from '../../../lib/giphySDK';
import { getRandomArrayElement } from '../../../helpers';

type GIFMeQuery = {
  q: string;
  limit: string;
};

const maxLimit = 50;

// GET /api/search
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { q, limit } = <GIFMeQuery>req.query;
  const limitInt = parseInt(limit);

  const { data: results } = await giphyFetch.search(q, {
    sort: 'relevant',
    limit: maxLimit,
  });

  const selection = [];
  for (let i = 0; i < limitInt; i++) {
    selection.push(getRandomArrayElement(results));
  }

  res.status(200).json(selection);
}
