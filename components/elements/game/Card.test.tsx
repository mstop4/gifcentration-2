import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';
import { IGif } from '@giphy/js-types';
import mockIGifs from '../../../mockData/clientIGifs.json';
import { organizeImages } from '../../../helpers/gif';

const handleClickMock = jest.fn();
const updateImageLoadedMock = jest.fn();

const makeCard = (mockGifIndex: number, flipped = false, matched = false) => {
  const imageData = organizeImages(mockIGifs[mockGifIndex] as unknown as IGif);

  return (
    <Card
      reduceMotions={false}
      index={0}
      imageData={imageData}
      flipped={flipped}
      matched={matched}
      handleCardClick={handleClickMock}
      updateImageLoaded={updateImageLoadedMock}
    />
  );
};

describe('Card', () => {
  it('renders a Card', () => {
    const { container } = render(makeCard(0));

    const card = container.querySelector('.cardContainer');
    expect(card).toBeInTheDocument();
  });

  it('has a front with a "?" icon', () => {
    const { container } = render(makeCard(0));

    const cardFront = container?.querySelector('.front');
    expect(cardFront).toBeInTheDocument();
    const icon = screen.queryByTestId('question mark');
    expect(icon).toBeInTheDocument();
  });

  it('has a back', () => {
    const { container } = render(makeCard(0));

    const cardBack = container?.querySelector('.back');
    expect(cardBack).toBeInTheDocument();
  });

  it('should be front-facing when initialized', () => {
    const { container } = render(makeCard(0));

    const card = container.querySelector('.cardContainer') as Element;
    expect(card).not.toHaveClass('flipped');
  });

  it('should flip when clicked', () => {
    const cardComp = makeCard(0);
    const { container } = render(cardComp);

    const cardContainer = container.querySelector('.cardContainer') as Element;
    fireEvent.click(cardContainer);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('should have a flipped class on cardBody when flipped', () => {
    const cardComp = makeCard(0, true);
    const { container } = render(cardComp);
    const cardBody = container.querySelector('.cardBody') as Element;
    expect(cardBody).toHaveClass('flipped');
  });

  it('should have a matched class on cardBack when matched', () => {
    const cardComp = makeCard(0, false, true);
    const { container } = render(cardComp);
    const cardBack = container.querySelector('.back') as Element;
    expect(cardBack).toHaveClass('matched');
  });

  it('should call handleGifLoad when picture is loaded', () => {
    const { container } = render(makeCard(0));

    const img = container.querySelector('.cardImage') as Element;
    fireEvent.load(img);
    expect(updateImageLoadedMock).toBeCalled();
  });

  it("should still work with gif data that's missing a gif URL", () => {
    const { container } = render(makeCard(3));

    const card = container.querySelector('.cardContainer');
    expect(card).toBeInTheDocument();
  });
});
