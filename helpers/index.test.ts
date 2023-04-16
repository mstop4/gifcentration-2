import {
  randomIntegerRange,
  getRectangleDimensions,
  pairShuffler,
  sleep,
} from '.';

describe('pairShuffler', () => {
  it('should return an array twice of length of numPairs', () => {
    const numPairs = 5;

    const shuffledPairs = pairShuffler(numPairs);
    expect(shuffledPairs).toHaveLength(numPairs * 2);
  });

  it('should return an array with two of each index', () => {
    const numPairs = 6;

    const shuffledPairs = pairShuffler(numPairs);
    const indexCounts: number[] = Array(numPairs).fill(0);

    for (const index of shuffledPairs) {
      indexCounts[index]++;
    }

    const correctCounts = indexCounts.every(count => count === 2);
    expect(correctCounts).toBeTruthy();
  });
});

describe('getRectangleDimensions', () => {
  it('should return a rectangle of 6 x 5 given 30 elements', () => {
    const rect = getRectangleDimensions(30);
    expect(rect.majorAxisSize).toEqual(6);
    expect(rect.minorAxisSize).toEqual(5);
  });

  it('should return a rectangle of 7 x 1 given 7 elements', () => {
    const rect = getRectangleDimensions(7);
    expect(rect.majorAxisSize).toEqual(7);
    expect(rect.minorAxisSize).toEqual(1);
  });

  it('should return a rectangle of 12 x 13 given 156 elements', () => {
    const rect = getRectangleDimensions(156);
    expect(rect.majorAxisSize).toEqual(13);
    expect(rect.minorAxisSize).toEqual(12);
  });

  it('should reject input of -144 elements', () => {
    const rect = getRectangleDimensions(-144);
    expect(rect.majorAxisSize).toEqual(0);
    expect(rect.minorAxisSize).toEqual(0);
  });

  it('should reject input of 0 elements', () => {
    const rect = getRectangleDimensions(0);
    expect(rect.majorAxisSize).toEqual(0);
    expect(rect.minorAxisSize).toEqual(0);
  });
});

describe('sleep', () => {
  it('should resolve', async () => {
    await expect(sleep(1000)).resolves.not.toThrow();
  });
});

describe('randomIntegerRange', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  it('should return 1', () => {
    const num = randomIntegerRange(0, 2);
    expect(num).toEqual(1);
  });

  it('should return 42 from the array', () => {
    const arr = [-13, '45', null, 42, true, 0.564];
    const index = randomIntegerRange(0, arr.length);
    expect(arr[index]).toEqual(42);
  });

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
