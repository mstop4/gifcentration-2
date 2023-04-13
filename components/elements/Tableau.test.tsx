import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import Tableau from './Tableau';
import '@testing-library/jest-dom';
import { GameState } from '../layout/Game';

const makeTableau = (): ReactElement => {
  return (
    <Tableau
      gameState={GameState.Playing}
      setGameState={jest.fn()}
      flipped={[false, false]}
      setFlipped={jest.fn()}
      matched={[false, false]}
      setMatched={jest.fn()}
      imageIndexes={[1, 1]}
      imageUrls={['apple', 'banana']}
      selectedCardIndexes={[]}
      addSelectedCardIndex={jest.fn()}
      resetSelectedCardIndexes={jest.fn()}
    />
  );
};

describe('Tableau', () => {
  it('renders a Tableau', async () => {
    const { container } = render(makeTableau());
    const tableau = container.querySelector('#tableau');

    await waitFor(() => {
      expect(tableau).toBeInTheDocument();
    });
  });

  it('has 2 Cards in the tableau div', async () => {
    const { container } = render(makeTableau());
    const tableau = container.querySelector('#tableau');
    const cards = tableau?.querySelectorAll('.cardContainer');

    await waitFor(() => {
      expect(cards).toHaveLength(2);
      cards?.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });
  });
});
