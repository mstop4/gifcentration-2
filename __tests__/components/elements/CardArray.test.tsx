import React from 'react';
import { render } from '@testing-library/react';
import CardArray from '../../../components/elements/CardArray';
import '@testing-library/jest-dom';

describe('CardArray', () => {
  it('renders a CardArray', () => {
    const { container } = render(<CardArray />);
    const cardArray = container.querySelector('.cardArray');

    expect(cardArray).toBeInTheDocument();
  });

  it('has a Card in the cardArray div', () => {
    const { container } = render(<CardArray />);
    const cardArray = container.querySelector('.cardArray');
    const card = cardArray?.querySelector('.cardContainer');

    expect(card).toBeInTheDocument();
  });
});
