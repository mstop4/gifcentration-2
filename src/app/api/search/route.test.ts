/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */

// TODO: Figure out how to mock requests and responses

// import httpMocks from 'node-mocks-http';
// import { GET } from './route';
// import mockGifs from '../../../../mocks/serverIGifs.json';
// import { IGif } from '@giphy/js-types';

// jest.mock('../../../../lib/redis', () => ({
//   getCache: async () => {
//     const client = {
//       store: {},
//       exists: function (key) {
//         return key in this.store;
//       },
//       get: function (key) {
//         return this.store[key];
//       },
//       set: function (key, value) {
//         this.store[key] = value;
//       },
//     };

//     return client;
//   },
// }));

// import giphyFetch from '../../../../lib/giphySDK';
// jest.spyOn(giphyFetch, 'search').mockImplementation(async () => {
//   return {
//     data: mockGifs as unknown as IGif[],
//     meta: {
//       msg: '',
//       response_id: '',
//       status: 0,
//     },
//     pagination: {
//       count: 0,
//       total_count: 1,
//       offset: 0,
//     },
//   };
// });

// describe('GET api/search', () => {
//   it('should work', async () => {
//     const request = httpMocks.createRequest({
//       method: 'GET',
//       url: '/api/search',
//       params: {
//         q: 'dogs',
//         limit: 18,
//         rating: 'g',
//       },
//     });

//     const result = await GET(request);
//     expect(result).toBeDefined();
//   });
// });
