import { IGif, IImage, IImages } from '@giphy/js-types';
import { IWebP } from '@giphy/js-types/dist/images';

export type GifData = {
  width: number;
  height: number;
  gifUrl?: string;
  webpUrl?: string;
  originalKey: string;
};

export type GifDataUrlKeys = 'gifUrl' | 'webpUrl';

export type SortedGifData = {
  stills: GifData[];
  animated: GifData[];
  title: string;
  id: string;
  linkUrl: string;
};

export type BestGifData = {
  url: string | undefined;
  width: number | undefined;
  height: number | undefined;
  originalKey: string | undefined;
};

export type BestGifsResults = {
  gif: BestGifData;
  webp: BestGifData;
};

export type BestGifResultsKeys = keyof BestGifsResults;

const stillKeys = [
  'fixed_width_still',
  'downsized_still',
  'original_still',
  'fixed_height_small_still',
  'fixed_width_small_still',
  'fixed_height_still',
  '480w_still',
];

// Keys commented out only have URLS to MP4s, which are currently unused
const animatedKeys = [
  // 'hd',
  'fixed_height_downsampled',
  'preview_gif',
  // 'preview',
  'fixed_height_small',
  'downsized',
  'fixed_width_downsampled',
  'fixed_width',
  'downsized_medium',
  // 'original_mp4',
  'downsized_large',
  'preview_webp',
  'original',
  'fixed_width_small',
  // 'looping',
  // 'downsized_small',
  'fixed_height',
];

export const organizeImages = (gifData: IGif): SortedGifData => {
  const sortedData: SortedGifData = {
    stills: [],
    animated: [],
    title: gifData.title ?? '',
    id: gifData.id?.toString() ?? '',
    linkUrl: gifData.url ?? '',
  };

  const { images } = gifData;

  // Sort all stills
  for (const key of stillKeys) {
    const imageData = images[key as keyof IImages];
    if (!imageData) continue;

    const newGifData: GifData = {
      width: imageData.width,
      height: imageData.height,
      gifUrl: (imageData as IImage).url,
      originalKey: key,
    };

    sortedData.stills.push(newGifData);
    sortedData.stills.sort((a, b) => b.width - a.width);
  }

  // Sort all animated images
  for (const key of animatedKeys) {
    const imageData = images[key as keyof IImages];
    if (!imageData) continue;

    const newGifData: GifData = {
      width: imageData.width,
      height: imageData.height,
      gifUrl: (imageData as IImage)?.url,
      webpUrl: (imageData as IWebP)?.webp,
      originalKey: key,
    };

    sortedData.animated.push(newGifData);
    sortedData.animated.sort((a, b) => b.width - a.width);
  }

  return sortedData;
};

export const calculateTargetSize = (
  imageData: SortedGifData,
  width: number,
  gifSizeScale: number,
  defaultSize: number
) => {
  // Determine aspect ratio of image and resize
  let targetWidth = defaultSize;
  let targetHeight = defaultSize;

  const originalGif = imageData?.animated?.find(
    image => image?.originalKey === 'original'
  );

  if (originalGif) {
    const { width: originalWidth, height: originalHeight } = originalGif;

    if (originalWidth >= originalHeight) {
      // Wide
      // width will always be defined here
      targetWidth = width * gifSizeScale;
      targetHeight = ((width * originalHeight) / originalWidth) * gifSizeScale;
    } else {
      // Tall
      targetHeight = (width ?? defaultSize) * gifSizeScale;
      targetWidth =
        (((width ?? defaultSize) * originalWidth) / originalHeight) *
        gifSizeScale;
    }
  }

  return {
    targetWidth,
    targetHeight,
  };
};

export const findBestRepresentations = (
  imageData: SortedGifData,
  targetWidth: number,
  isAnimated: boolean
) => {
  const gifDataArray =
    (isAnimated ? imageData?.animated : imageData?.stills) ?? [];
  const results: BestGifsResults = {
    gif: {
      url: '',
      width: 0,
      height: 0,
      originalKey: '',
    },
    webp: {
      url: '',
      width: 0,
      height: 0,
      originalKey: '',
    },
  };

  const _assignProps = (
    resultsKey: BestGifResultsKeys,
    image: GifData,
    urlKey: GifDataUrlKeys
  ) => {
    results[resultsKey].url = image[urlKey];
    results[resultsKey].width = image.width;
    results[resultsKey].height = image.height;
    results[resultsKey].originalKey = image.originalKey;
  };

  for (const image of gifDataArray) {
    if (image.width >= targetWidth) {
      if (image.gifUrl) _assignProps('gif', image, 'gifUrl');
      if (image.webpUrl) _assignProps('webp', image, 'webpUrl');
    } else {
      if (!Object.values(results).some(key => key.url === '')) {
        // If all urls are filled in, return results object
        return results;
      } else {
        // Fill in any remaining urls with largest image avaiable
        if (results.gif.url === '' && image.gifUrl)
          _assignProps('gif', image, 'gifUrl');

        if (results.webp.url === '' && image.webpUrl)
          _assignProps('webp', image, 'webpUrl');
      }
    }
  }

  return results;
};
