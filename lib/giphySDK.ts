import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyFetch = new GiphyFetch(<string>process.env.GIPHY_API_KEY);

export default giphyFetch;
