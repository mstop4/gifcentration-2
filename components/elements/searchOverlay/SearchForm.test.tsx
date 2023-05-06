import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';
import mockTopSearches from '../../../mockData/popular.json';
import { TopSearchResult } from '../../../lib/mongodb/helpers';
import { useGameStore } from '../../game/Game.stores';
import {
  cleanupZustandHooks,
  getZustandHooks,
} from '../../../helpers/zustandTest';

const hookNames = ['idealTableauSize', 'setIdealTableauSize', 'setGameState'];

const makeSearchForm = (): ReactElement => (
  <SearchForm
    resetCards={jest.fn()}
    updateImageData={jest.fn()}
    resetImageLoaded={jest.fn()}
    setGifErrorState={jest.fn()}
    setAlertVisible={jest.fn()}
    stopConfetti={jest.fn()}
    startLoadTimers={jest.fn()}
    topSearches={mockTopSearches as unknown as TopSearchResult[]}
  />
);

describe('SearchForm', () => {
  beforeEach(() => {
    getZustandHooks(useGameStore, hookNames);
  });

  afterEach(() => {
    cleanupZustandHooks(hookNames);
  });

  it('renders a SearchForm', async () => {
    const { container } = render(makeSearchForm());
    const form = container.querySelector('#searchForm');

    await waitFor(() => {
      expect(form).toBeInTheDocument();
    });
  });
});
