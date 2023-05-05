import { IGif } from '@giphy/js-types';
import mockIGifs from '../mockData/clientIGifs.json';
import {
  calculateTargetSize,
  findBestRepresentations,
  organizeImages,
} from './gif';

describe('organizeImages', () => {
  it('should work', () => {
    const sortedData = organizeImages(mockIGifs[0] as unknown as IGif);
    expect(sortedData).toBeDefined();
  });

  it('should still work with broken gif data', () => {
    const sortedData = organizeImages(mockIGifs[3] as unknown as IGif);
    expect(sortedData).toBeDefined();
  });
});

describe('calculateTargetSize', () => {
  it('should return proper dims for wide images', () => {
    const sortedData = {
      animated: [
        {
          width: 800,
          height: 600,
          originalKey: 'original',
        },
      ],
      stills: [],
      title: 'Test',
      linkUrl: 'https://example.com',
    };
    const targetSize = calculateTargetSize(sortedData, 400, 1, 100);
    expect(targetSize).toMatchObject({
      targetWidth: 400,
      targetHeight: 300,
    });
  });

  it('should return proper dims for tall images', () => {
    const sortedData = {
      animated: [
        {
          width: 100,
          height: 400,
          originalKey: 'original',
        },
      ],
      stills: [],
      title: 'Test',
      linkUrl: 'https://example.com',
    };
    const targetSize = calculateTargetSize(sortedData, 200, 1, 500);
    expect(targetSize).toMatchObject({
      targetWidth: 50,
      targetHeight: 200,
    });
  });

  it('should return proper dims for square images', () => {
    const sortedData = {
      animated: [
        {
          width: 900,
          height: 900,
          originalKey: 'original',
        },
      ],
      stills: [],
      title: 'Test',
      linkUrl: 'https://example.com',
    };
    const targetSize = calculateTargetSize(sortedData, 300, 1, 1000);
    expect(targetSize).toMatchObject({
      targetWidth: 300,
      targetHeight: 300,
    });
  });

  it('should return proper dims for gifScaleSize < 1', () => {
    const sortedData = {
      animated: [
        {
          width: 1000,
          height: 500,
          originalKey: 'original',
        },
      ],
      stills: [],
      title: 'Test',
      linkUrl: 'https://example.com',
    };
    const targetSize = calculateTargetSize(sortedData, 800, 0.5, 100);
    expect(targetSize).toMatchObject({
      targetWidth: 400,
      targetHeight: 200,
    });
  });

  it('should return default size if original gif is missing', () => {
    const sortedData = {
      animated: [],
      stills: [],
      title: 'Test',
      linkUrl: 'https://example.com',
    };
    const targetSize = calculateTargetSize(sortedData, 123, 0.5, 345);
    expect(targetSize).toMatchObject({
      targetWidth: 345,
      targetHeight: 345,
    });
  });
});

describe('findBestRepresentations', () => {
  it('should work', () => {
    const sortedData = organizeImages(mockIGifs[0] as unknown as IGif);
    const bestReps = findBestRepresentations(sortedData, 400, true);
    expect(bestReps).toBeDefined();
  });

  it('should still work with broken gif data', () => {
    const sortedData = organizeImages(mockIGifs[3] as unknown as IGif);
    const bestReps = findBestRepresentations(sortedData, 400, true);
    expect(bestReps).toBeDefined();
  });
});
