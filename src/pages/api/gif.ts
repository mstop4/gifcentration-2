import { NextApiRequest, NextApiResponse } from 'next';
import giphyFetch from '../../../lib/giphySDK';

type GIFMeQuery = {
  id: string;
};

// GET /api/gif
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = <GIFMeQuery>req.query;

  const { data: result } = await giphyFetch.gif(id);

  res.status(200).json(result);
}
