import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';
import mockTopSearches from '../../../mockData/popular.json';
import { TopSearchResult } from '../../../lib/mongodb/helpers';
import { useGameStore } from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let store;

const makeSearchForm = (): ReactElement => (
  <SearchForm
    resetCards={jest.fn()}
    updateImageData={jest.fn()}
    resetImageLoaded={jest.fn()}
    startLoadTimers={jest.fn()}
    topSearches={mockTopSearches as unknown as TopSearchResult[]}
  />
);

describe('SearchForm', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useGameStore);
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
  });

  it('renders a SearchForm', async () => {
    const { container } = render(makeSearchForm());
    const form = container.querySelector('#searchForm');

    await waitFor(() => {
      expect(form).toBeInTheDocument();
    });
  });
});
