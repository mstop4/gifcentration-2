import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import Tableau from './Tableau';
import '@testing-library/jest-dom';
import { IGif } from '@giphy/js-types';
import mockIGifs from '../../../mockData/clientIGifs.json';
import { organizeImages } from '../../../helpers/gif';
import { useGameStore } from '../../game/Game.stores';
import {
  getZustandHooks,
  cleanupZustandHooks,
} from '../../../helpers/zustandTest';

const hookNames = [
  'gameState',
  'setGameState',
  'flipped',
  'setFlipped',
  'matched',
  'setMatched',
  'selectedCardIndexes',
  'setSelectedCardIndexes',
];

const makeTableau = (): ReactElement => {
  const imageData = mockIGifs.map((imageData: unknown) =>
    organizeImages(imageData as IGif)
  );

  return (
    <Tableau
      reduceMotions={false}
      imageIndexes={[0, 0]}
      imageData={imageData}
      updateImageLoaded={jest.fn()}
      showConfetti={jest.fn()}
    />
  );
};

describe('Tableau', () => {
  beforeEach(() => {
    getZustandHooks(useGameStore, hookNames);
  });

  afterEach(() => {
    cleanupZustandHooks(hookNames);
  });

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
