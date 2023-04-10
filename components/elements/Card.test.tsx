import React, { ReactElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

const handleClickMock = jest.fn();
const makeCard = (
  flipped = false,
  active = true,
  matched = false
): ReactElement => (
  <Card
    index={0}
    imageIndex={0}
    flipped={flipped}
    active={active}
    matched={matched}
    handleCardClick={handleClickMock}
  />
);

describe('Card', () => {
  it('renders a Card', () => {
    const { container } = render(makeCard());

    const card = container.querySelector('.cardHolder');
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

    const gifElem = cardBack?.querySelector('.gif');
    expect(gifElem).toBeInTheDocument();
  });

  it('should be front-facing when initialized', () => {
    const { container } = render(makeCard());

    const card = container.querySelector('.cardHolder') as Element;
    expect(card).not.toHaveClass('flipped');
  });

  it('should flip when clicked', () => {
    const cardComp = makeCard();
    const { container } = render(cardComp);

    const cardHolder = container.querySelector('.cardHolder') as Element;
    fireEvent.click(cardHolder);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('should have a flipped class on cardBody when flipped', () => {
    const cardComp = makeCard(true);
    const { container } = render(cardComp);
    const cardHolder = container.querySelector('.cardBody') as Element;
    expect(cardHolder).toHaveClass('flipped');
  });
});
