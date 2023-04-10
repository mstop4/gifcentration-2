import pairShuffler from './pairShuffler';

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
