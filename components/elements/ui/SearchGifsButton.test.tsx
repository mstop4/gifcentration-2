import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';
import { GameState } from '../../game/Game.typedefs';

describe('SearchGifsButton', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders a SearchGifsButton', () => {
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={jest.fn()}
      />
    );
    const button = container.querySelector('#searchGifsButton');
    expect(button).toBeInTheDocument();
  });

  it('calls showSearchOverlay and dispatchVisible when clicked when not busy', async () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);
    await act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
    });
  });

  it("doesn't call showSearchOverlay when clicked when already searching/loading", async () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Searching}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;

    fireEvent.click(button);
    await act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(showSearchOverlayMock).not.toBeCalled();
    });
  });
});
