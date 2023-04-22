import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';
import { GameState } from '../../layout/Game';

describe('SearchGifsButton', () => {
  it('renders a SearchGifsButton', async () => {
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={jest.fn()}
        dispatchVisible={jest.fn()}
      />
    );
    const card = container.querySelector('#searchGifsButton');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });
  });

  it('calls showSearchOverlay and dispatchVisible when clicked when not busy', async () => {
    const showSearchOverlayMock = jest.fn();
    const dispatchVisibleMock = jest.fn();

    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={showSearchOverlayMock}
        dispatchVisible={dispatchVisibleMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
      expect(dispatchVisibleMock).toBeCalledWith({
        prop: 'visible',
        value: false,
      });
    });
  });

  it("doesn't call showSearchOverlay when clicked when already searching/loading", async () => {
    const showSearchOverlayMock = jest.fn();
    const dispatchVisibleMock = jest.fn();

    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Searching}
        showSearchOverlay={showSearchOverlayMock}
        dispatchVisible={dispatchVisibleMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      expect(showSearchOverlayMock).not.toBeCalled();
      expect(dispatchVisibleMock).not.toBeCalled();
    });
  });
});
