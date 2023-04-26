import { IGif } from '@giphy/js-types';
import mockIGifs from '../mockData/IGifs.json';
import { organizeImages } from './gif';

describe.only('organizeImages', () => {
  it('should work', () => {
    const sortedData = organizeImages(mockIGifs[0] as unknown as IGif);
    expect(sortedData).toBeDefined();
  });
});
