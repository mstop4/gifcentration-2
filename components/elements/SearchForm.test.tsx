import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';

const makeSearchForm = (): ReactElement => (
  <SearchForm
    searchQuery={'foo'}
    setSearchQuery={jest.fn()}
    numCards={2}
    setNumCards={jest.fn()}
    getGifs={jest.fn()}
    resetCards={jest.fn()}
    setGameState={jest.fn()}
    hideSearchOverlay={jest.fn()}
  />
);

describe('SearchForm', () => {
  it('renders a SearchForm', async () => {
    const { container } = render(makeSearchForm());
    const form = container.querySelector('#searchForm');

    await waitFor(() => {
      expect(form).toBeInTheDocument();
    });
  });
});
