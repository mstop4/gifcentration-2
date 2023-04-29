import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import Tableau from './Tableau';
import '@testing-library/jest-dom';
import { GameState } from '../../layout/Game.typedefs';
import { IGif } from '@giphy/js-types';
import mockIGifs from '../../../mocks/clientIGifs.json';
import { organizeImages } from '../../../helpers/gif';

const makeTableau = (): ReactElement => {
  const imageData = mockIGifs.map((imageData: unknown) =>
    organizeImages(imageData as IGif)
  );

  return (
    <Tableau
      reduceMotions={false}
      gameState={GameState.Playing}
      setGameState={jest.fn()}
      flipped={[false, false]}
      setFlipped={jest.fn()}
      matched={[false, false]}
      setMatched={jest.fn()}
      imageIndexes={[0, 0]}
      imageData={imageData}
      selectedCardIndexes={[]}
      updateImageLoaded={jest.fn()}
      setSelectedCardIndexes={jest.fn()}
      showConfetti={jest.fn()}
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
