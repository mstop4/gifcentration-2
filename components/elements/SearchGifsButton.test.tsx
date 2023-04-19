import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';
import { GameState } from '../layout/Game';

describe('SearchGifsButton', () => {
  it('renders a SearchGifsButton', async () => {
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={jest.fn()}
      />
    );
    const card = container.querySelector('#searchGifsButton');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });
  });

  it('calls showSearchOverlay when clicked', async () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
    });
  });
});
