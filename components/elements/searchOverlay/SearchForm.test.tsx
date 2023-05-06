import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';
import mockTopSearches from '../../../mockData/popular.json';
import { TopSearchResult } from '../../../lib/mongodb/helpers';
import { useGameStore } from '../../game/Game.stores';
import { getZustandHooks } from '../../../helpers/zustandTest';

let zustandHooks;

const makeSearchForm = (): ReactElement => (
  <SearchForm
    resetCards={jest.fn()}
    updateImageData={jest.fn()}
    resetImageLoaded={jest.fn()}
    setGifErrorState={jest.fn()}
    startLoadTimers={jest.fn()}
    topSearches={mockTopSearches as unknown as TopSearchResult[]}
  />
);

describe('SearchForm', () => {
  beforeAll(() => {
    zustandHooks = getZustandHooks(useGameStore);
  });

  beforeEach(() => {
    zustandHooks.reset();
  });

  afterAll(() => {
    zustandHooks.unmount();
    zustandHooks = null;
  });

  it('renders a SearchForm', async () => {
    const { container } = render(makeSearchForm());
    const form = container.querySelector('#searchForm');

    await waitFor(() => {
      expect(form).toBeInTheDocument();
    });
  });
});
