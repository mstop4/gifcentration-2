import mongoose, { Schema } from 'mongoose';
import { Rating } from '@giphy/js-fetch-api';
import serverConfig from '../../../config/serverConfig';

export type TSearch = {
  query: string;
  rating: Rating;
  isObscene: boolean;
};

const SearchSchema = new Schema<TSearch>(
  {
    query: { type: String, required: true },
    rating: { type: String, required: true },
    isObscene: { type: Boolean, required: true },
  },
  { timestamps: true },
);

SearchSchema.index(
  { createdAt: 1 },
  {
    expires:
      process.env.NODE_ENV === 'production'
        ? serverConfig.mongoose.documentExpiryTime.prod
        : serverConfig.mongoose.documentExpiryTime.dev,
  },
);

// https://stackoverflow.com/questions/75697312/import-mongoose-lib-in-api-directory-in-next-js-13-2-app-directory-gives-error
const Search =
  mongoose.models && 'Search' in mongoose.models
    ? mongoose.models.Search
    : mongoose.model('Search', SearchSchema);
export default Search;
