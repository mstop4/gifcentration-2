import { NextApiRequest, NextApiResponse } from 'next';
import giphyFetch from '../../../lib/giphySDK';

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

  const { data: results } = await giphyFetch.search(q, {
    sort: 'relevant',
  });

  res.status(200).json(results);
}
