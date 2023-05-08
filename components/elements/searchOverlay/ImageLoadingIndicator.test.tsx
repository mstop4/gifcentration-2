import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ImageLoadingIndicator from './ImageLoadingIndicator';
import '@testing-library/jest-dom';
import {
  useGameStore,
  useImageDataStore,
  useUIVisibleStore,
} from '../../../stores/stores';
import { GameState } from '../../game/Game.typedefs';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let gameStore;
let imageDataStore;
let uiVisibleStore;

describe('ImageLoadingIndicator', () => {
  beforeAll(() => {
    gameStore = getZustandStoreHooks(useGameStore);
    imageDataStore = getZustandStoreHooks(useImageDataStore);
    uiVisibleStore = getZustandStoreHooks(useUIVisibleStore);
  });

  beforeEach(() => {
    gameStore.reset();
    imageDataStore.reset();
    uiVisibleStore.reset();
  });

  afterAll(() => {
    gameStore.unmount();
    imageDataStore.unmount();
    uiVisibleStore.unmount();
    gameStore = null;
    imageDataStore = null;
    uiVisibleStore = null;
  });

  it('renders a ImageLoadingIndicator', async () => {
    const numCards = 18;

    await act(() => {
      gameStore.getState().setGameState(GameState.Searching);
      gameStore.getState().setActualTableauSize(numCards);
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    const { container } = render(<ImageLoadingIndicator />);

    const spinner = container.querySelector('#imageLoadingIndicator');
    expect(spinner).toBeInTheDocument();
  });

  it('says "Searching..."', async () => {
    const numCards = 10;
    await act(() => {
      gameStore.getState().setGameState(GameState.Searching);
      gameStore.getState().setActualTableauSize(numCards);
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    render(<ImageLoadingIndicator />);

    const text = screen.queryByText(/searching.../i);
    expect(text).toBeInTheDocument();
  });

  it('says "Loading..."', async () => {
    const numCards = 12;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({ longWaitMsg: false });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    render(<ImageLoadingIndicator />);

    const text = screen.queryByText(/loading.../i);
    expect(text).toBeInTheDocument();
  });

  it('says "Still Loading..."', async () => {
    const numCards = 8;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({ longWaitMsg: true });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    render(<ImageLoadingIndicator />);

    const text1 = screen.queryByText(/still/i);
    const text2 = screen.queryByText(/loading.../i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('should have a progress bar that is partially full', async () => {
    const numCards = 4;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({ longWaitMsg: false });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
      imageDataStore.getState().setImageLoaded({ type: 'set', payload: 0 });
      imageDataStore.getState().setImageLoaded({ type: 'set', payload: 1 });
    });

    const { container } = render(<ImageLoadingIndicator />);
    const progress = container.querySelector('progress');
    expect(progress?.value).toEqual(2);
    expect(progress?.max).toEqual(numCards);
  });
});
