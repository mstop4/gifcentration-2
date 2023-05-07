import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchPopularChip from './SearchPopularChip';
import '@testing-library/jest-dom';

describe('SearchPopularChip', () => {
  it('renders a SearchPopularChip', () => {
    const { container } = render(
      <SearchPopularChip query="test" setSearchQuery={jest.fn()} />
    );
    const chip = container.querySelector('.queryChip');

    expect(chip).toBeInTheDocument();
  });

  it('clicking on it should set search query', async () => {
    const setSearchQueryMock = jest.fn();
    const { container } = render(
      <SearchPopularChip query="test" setSearchQuery={setSearchQueryMock} />
    );

    const chip = container.querySelector('.queryChip') as Element;
    fireEvent.click(chip);

    await waitFor(() => {
      expect(setSearchQueryMock).toBeCalled();
    });
  });
});
