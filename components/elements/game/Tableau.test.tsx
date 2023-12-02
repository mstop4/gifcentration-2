import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import Tableau from './Tableau';
import '@testing-library/jest-dom';
import { IGif } from '@giphy/js-types';
import mockIGifs from '../../../mockData/clientIGifs.json';
import { organizeImages } from '../../../helpers/gif';
import { useGameStore, useImageDataStore } from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let gameStore;
let imageDataStore;
const imageData = mockIGifs.map((imageData: unknown) =>
  organizeImages(imageData as IGif),
);

const makeTableau = (): ReactElement => (
  <Tableau
    reduceMotions={false}
    updateImageLoaded={jest.fn()}
    showConfetti={jest.fn()}
  />
);

describe('Tableau', () => {
  beforeEach(() => {
    gameStore = getZustandStoreHooks(useGameStore);
    imageDataStore = getZustandStoreHooks(useImageDataStore);
    imageDataStore.setState({ imageIndexes: [0, 0], imageData: imageData });
  });

  afterEach(() => {
    gameStore.unmount();
    gameStore = null;

    imageDataStore.unmount();
    imageDataStore = null;
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
    const cards = tableau?.querySelectorAll('.container');

    await waitFor(() => {
      expect(cards).toHaveLength(2);
      cards?.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });
  });
});
