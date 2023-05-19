import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ImageLoadingIndicator from './ImageLoadingIndicator';
import '@testing-library/jest-dom';
import {
  useGameStore,
  useImageDataStore,
  useUIVisibleStore,
} from '../../../stores/stores';
import { GameState } from '../../game/Game.enums';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';
import { ImageLoadingStatus } from '../../game/Game.enums';

let gameStore;
let imageDataStore;
let uiVisibleStore;

describe('ImageLoadingIndicator', () => {
  beforeAll(() => {
    gameStore = getZustandStoreHooks(useGameStore);
    imageDataStore = getZustandStoreHooks(useImageDataStore);
    uiVisibleStore = getZustandStoreHooks(useUIVisibleStore);
    jest.useFakeTimers();
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
    jest.useRealTimers();
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
      uiVisibleStore.setState({ imageLoadingStatus: ImageLoadingStatus.OK });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    render(<ImageLoadingIndicator />);

    const text = screen.queryByText(/preloading gifs.../i);
    expect(text).toBeInTheDocument();
  });

  it('says "Still Loading..."', async () => {
    const numCards = 8;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({
        imageLoadingStatus: ImageLoadingStatus.LongWait,
      });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    render(<ImageLoadingIndicator />);

    const text = screen.queryByText(/still preloading gifs.../i);
    expect(text).toBeInTheDocument();
  });

  it('should display the Start Game Now button', async () => {
    const numCards = 8;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({
        imageLoadingStatus: ImageLoadingStatus.Timeout,
      });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    const { container } = render(<ImageLoadingIndicator />);

    const button = container.querySelector('#startGameButton');
    const text = screen.queryByText(/still preloading gifs.../i);
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should click on Start Game Now button', async () => {
    const numCards = 8;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({
        imageLoadingStatus: ImageLoadingStatus.Timeout,
      });
      imageDataStore
        .getState()
        .setImageLoaded({ type: 'clear', payload: numCards / 2 });
    });

    const { container } = render(<ImageLoadingIndicator />);
    const button = container.querySelector('#startGameButton') as Element;
    fireEvent.click(button);

    await act(() => jest.runAllTimers());
    await waitFor(() => {
      const overlayVisible = uiVisibleStore.getState().overlay;
      const gameState = gameStore.getState().gameState;
      expect(overlayVisible).toEqual(false);
      expect(gameState).toEqual(GameState.Playing);
    });
  });

  it('should have a progress bar that is partially full', async () => {
    const numCards = 4;
    await act(() => {
      gameStore.getState().setGameState(GameState.Loading);
      gameStore.getState().setActualTableauSize(numCards);
      uiVisibleStore.setState({ imageLoadingStatus: ImageLoadingStatus.OK });
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
