import dbConnect from './connect';
import Search from './models/Search';
import serverConfig from '../../config/serverConfig';
import { Rating } from '@giphy/js-fetch-api';

export type TopSearchResult = {
  _id: string;
  rating: Rating;
};

export async function getTopSearches(): Promise<TopSearchResult[]> {
  await dbConnect();
  const topSearches = await Search.aggregate()
    .group({ _id: '$query', count: { $sum: 1 } })
    .sort({ count: -1 })
    .limit(serverConfig.home.topSearchesLimit);

  return topSearches;
}
