import mongoose, { Schema } from 'mongoose';
import { Rating } from '@giphy/js-fetch-api';

export type TSearch = {
  query: string;
  rating: Rating;
  expireAt: Date;
};

const SearchSchema = new Schema<TSearch>(
  {
    query: { type: String, required: true },
    rating: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now() + 10 * 60 * 1000, // expires in 10 minutes
    },
  },
  { timestamps: true }
);

// https://stackoverflow.com/questions/75697312/import-mongoose-lib-in-api-directory-in-next-js-13-2-app-directory-gives-error
const Search =
  mongoose.models && 'Search' in mongoose.models
    ? mongoose.models.Search
    : mongoose.model('Search', SearchSchema);
export default Search;
