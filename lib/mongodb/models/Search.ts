import mongoose, { Schema, model } from 'mongoose';
import { Rating } from '@giphy/js-fetch-api';

export type TSearch = {
  query: string;
  rating: Rating;
  expireAt: Date;
};

const Search = new Schema<TSearch>(
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

export default mongoose.models?.Search || model<TSearch>('Search', Search);
