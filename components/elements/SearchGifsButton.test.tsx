import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';

describe('SearchGifsButton', () => {
  it('renders a SearchGifsButton', async () => {
    const { container } = render(
      <SearchGifsButton resetCards={jest.fn()} getGifs={jest.fn()} />
    );
    const card = container.querySelector('#searchGifsButton');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });
  });

  it('calls getGifs and resetCards when clicked', async () => {
    const resetCardsMock = jest.fn();
    const getGifsMock = jest.fn();
    const { container } = render(
      <SearchGifsButton resetCards={resetCardsMock} getGifs={getGifsMock} />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      expect(resetCardsMock).toBeCalled();
      expect(getGifsMock).toBeCalled();
    });
  });
});
