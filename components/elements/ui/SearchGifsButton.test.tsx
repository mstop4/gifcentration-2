import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';
import { GameState } from '../../game/Game.typedefs';
import { useGameStore } from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let store;

describe('SearchGifsButton', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useGameStore);
    jest.useFakeTimers();
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
    jest.useRealTimers();
  });

  it('renders a SearchGifsButton', async () => {
    await act(() => store.setState({ gameState: GameState.Playing }));

    const { container } = render(
      <SearchGifsButton showSearchOverlay={jest.fn()} />
    );
    const button = container.querySelector('#searchGifsButton');
    expect(button).toBeInTheDocument();
  });

  it('calls showSearchOverlay and dispatchVisible when clicked when not busy', async () => {
    await act(() => store.setState({ gameState: GameState.Playing }));

    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <SearchGifsButton showSearchOverlay={showSearchOverlayMock} />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);
    await act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
    });
  });

  it("doesn't call showSearchOverlay when clicked when already searching/loading", async () => {
    await act(() => store.setState({ gameState: GameState.Searching }));

    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <SearchGifsButton showSearchOverlay={showSearchOverlayMock} />
    );

    const button = container.querySelector('#searchGifsButton') as Element;

    fireEvent.click(button);
    await act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(showSearchOverlayMock).not.toBeCalled();
    });
  });
});
