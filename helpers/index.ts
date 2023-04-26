import { scryptSync, timingSafeEqual } from 'crypto';

export type RectangleDimensions = {
  majorAxisSize: number;
  minorAxisSize: number;
};

export const getRectangleDimensions = (
  numElem: number
): RectangleDimensions => {
  if (numElem < 1)
    return {
      majorAxisSize: 0,
      minorAxisSize: 0,
    };

  const squareRoot = Math.sqrt(numElem);
  let largestFactor = 1;

  for (let i = 2; i <= squareRoot; i++) {
    if (numElem % i === 0) {
      largestFactor = i;
    }
  }

  return {
    majorAxisSize: numElem / largestFactor,
    minorAxisSize: largestFactor,
  };
};

export const pairShuffler = (numPairs: number): number[] => {
  // fully random by @BetonMAN
  const shuffleArray = (arr: number[]): number[] =>
    arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

  const cards = [];

  for (let i = 0; i < numPairs; i++) {
    cards.push(i);
    cards.push(i);
  }

  return shuffleArray(cards);
};

export const randomIntegerRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const sleep = (duration: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

export const checkKey = (hash: string, key: string) => {
  const [hashedPassword, salt] = hash.split('.');

  const buffer = scryptSync(key, salt, 64);
  return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
};
