import React, { ReactElement } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import '@testing-library/jest-dom';

const makeSearchForm = (): ReactElement => (
  <SearchForm
    tableauSize={'2'}
    setTableauSize={jest.fn()}
    resetCards={jest.fn()}
    setGameState={jest.fn()}
    updateImageData={jest.fn()}
    resetImageLoaded={jest.fn()}
    setGifErrorState={jest.fn()}
    setAlertVisible={jest.fn()}
    stopConfetti={jest.fn()}
    startLoadTimers={jest.fn()}
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
