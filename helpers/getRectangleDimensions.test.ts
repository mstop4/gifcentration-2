import getRectangleDimensions from './getRectangleDimensions';

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
