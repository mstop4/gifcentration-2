import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';
import '@testing-library/jest-dom';
import {
  useGameStore,
  useImageDataStore,
  useUIVisibleStore,
} from '../../game/Game.stores';
import { GameState } from '../../game/Game.typedefs';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let gameStore;
let imageDataStore;
let uiVisibleStore;

describe('LoadingIndicator', () => {
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

  it('renders a LoadingIndicator', async () => {
    const numCards = 18;

    await act(() => {
      gameStore.getState().setGameState(GameState.Searching);
      gameStore.getState().setActualTableauSize(numCards);
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    const { container } = render(<LoadingIndicator />);

    const spinner = container.querySelector('#loadingIndicator');
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

    render(<LoadingIndicator />);

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

    render(<LoadingIndicator />);

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

    render(<LoadingIndicator />);

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

    const { container } = render(<LoadingIndicator />);
    const progress = container.querySelector('progress');
    expect(progress?.value).toEqual(2);
    expect(progress?.max).toEqual(numCards);
  });
});
