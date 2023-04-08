import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Card from '../../../components/elements/Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('renders a Card', () => {
    const { container } = render(<Card />);

    const card = container.querySelector('.cardContainer');
    expect(card).toBeInTheDocument();
  });

  it('has a front with a "?"', () => {
    const { container } = render(<Card />);

    const cardFront = container?.querySelector('.front');
    expect(cardFront).toBeInTheDocument();
    expect(cardFront?.innerHTML).toEqual('?');
  });

  it('has a back with the word "Back"', () => {
    const { container } = render(<Card />);

    const cardBack = container?.querySelector('.back');
    expect(cardBack).toBeInTheDocument();

    const gifElem = cardBack?.querySelector('.gif');
    expect(gifElem).toBeInTheDocument();
    expect(gifElem?.innerHTML).toEqual('Back');
  });

  it('should be front-facing when initialized', () => {
    const { container } = render(<Card />);

    const card = container.querySelector('.cardContainer') as Element;
    expect(card).not.toHaveClass('flipped');
  });

  it('should flip when clicked', () => {
    const { container } = render(<Card />);

    const cardBody = container.querySelector('.cardBody') as Element;
    fireEvent.click(cardBody);
    expect(cardBody).toHaveClass('flipped');
  });
});
