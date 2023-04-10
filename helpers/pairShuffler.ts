const pairShuffler = (numPairs: number): number[] => {
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

export default pairShuffler;
