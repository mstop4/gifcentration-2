export type RectangleDimensions = {
  majorAxisSize: number;
  minorAxisSize: number;
};

const getRectangleDimensions = (numElem: number): RectangleDimensions => {
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

export default getRectangleDimensions;
