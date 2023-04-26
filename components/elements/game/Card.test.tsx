import React, { ReactElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';
import { IGif } from '@giphy/js-types';
import { GameState } from '../../layout/Game.typedefs';
import mockIGifs from '../../../mockData/IGifs.json';

const handleClickMock = jest.fn();
const makeCard = (flipped = false, matched = false): ReactElement => (
  <Card
    gameState={GameState.Playing}
    index={0}
    imageData={mockIGifs[0] as unknown as IGif}
    flipped={flipped}
    matched={matched}
    handleCardClick={handleClickMock}
    updateImageLoaded={jest.fn()}
  />
);

describe('Card', () => {
  it('renders a Card', () => {
    const { container } = render(makeCard());

    const card = container.querySelector('.cardContainer');
    expect(card).toBeInTheDocument();
  });

  it('has a front with a "?" icon', () => {
    const { container } = render(makeCard());

    const cardFront = container?.querySelector('.front');
    expect(cardFront).toBeInTheDocument();
    const icon = screen.queryByTestId('question mark');
    expect(icon).toBeInTheDocument();
  });

  it('has a back', () => {
    const { container } = render(makeCard());

    const cardBack = container?.querySelector('.back');
    expect(cardBack).toBeInTheDocument();
  });

  it('should be front-facing when initialized', () => {
    const { container } = render(makeCard());

    const card = container.querySelector('.cardContainer') as Element;
    expect(card).not.toHaveClass('flipped');
  });

  it('should flip when clicked', () => {
    const cardComp = makeCard();
    const { container } = render(cardComp);

    const cardContainer = container.querySelector('.cardContainer') as Element;
    fireEvent.click(cardContainer);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('should have a flipped class on cardBody when flipped', () => {
    const cardComp = makeCard(true);
    const { container } = render(cardComp);
    const cardBody = container.querySelector('.cardBody') as Element;
    expect(cardBody).toHaveClass('flipped');
  });

  it('should have a matched class on cardBack when matched', () => {
    const cardComp = makeCard(false, true);
    const { container } = render(cardComp);
    const cardBack = container.querySelector('.back') as Element;
    expect(cardBack).toHaveClass('matched');
  });
});
