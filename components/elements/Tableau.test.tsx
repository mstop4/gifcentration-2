import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import Tableau from './Tableau';
import '@testing-library/jest-dom';

const makeTableau = (): ReactElement => {
  return (
    <Tableau
      flipped={[false, false]}
      setFlipped={jest.fn()}
      matched={[false, false]}
      setMatched={jest.fn()}
      numCards={2}
      imageIndexes={[1, 1]}
      selectedCardIndexes={[]}
      addSelectedCardIndex={jest.fn()}
      resetSelectedCardIndexes={jest.fn()}
    />
  );
};

describe('Tableau', () => {
  it('renders a Tableau', () => {
    const { container } = render(makeTableau());
    const tableau = container.querySelector('.tableau');

    expect(tableau).toBeInTheDocument();
  });

  it('has 2 Cards in the tableau div', () => {
    const { container } = render(makeTableau());
    const tableau = container.querySelector('.tableau');
    const cards = tableau?.querySelectorAll('.cardHolder');

    expect(cards).toHaveLength(2);
    cards?.forEach(card => {
      expect(card).toBeInTheDocument();
    });
  });
});
