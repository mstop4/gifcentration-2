import dbConnect from './connect';
import Search from './models/Search';
import serverConfig from '../../config/serverConfig';

export type TopSearchResult = {
  _id: string;
  count: number;
};

export async function getTopSearches(): Promise<TopSearchResult[]> {
  await dbConnect();
  const topSearches = await Search.aggregate([
    { $match: { isObscene: { $ne: true } } },
  ])
    .group({ _id: '$query', count: { $sum: 1 } })
    .sort({ count: -1 })
    .limit(serverConfig.home.topSearchesLimit);

  return topSearches;
}
