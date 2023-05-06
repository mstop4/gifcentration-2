import React from 'react';
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';
import '@testing-library/jest-dom';
import { useGameStore } from '../../game/Game.stores';
import { GameState } from '../../game/Game.typedefs';

describe('LoadingIndicator', () => {
  beforeEach(() => {
    const setGameState = renderHook(() =>
      useGameStore(state => state.setGameState)
    );

    global.setGameState = setGameState.result.current;
    global.unmountGameState = setGameState.unmount;

    const setActualTableauSize = renderHook(() =>
      useGameStore(state => state.setActualTableauSize)
    );

    global.setActualTableauSize = setActualTableauSize.result.current;
    global.unmountActualTableauSize = setActualTableauSize.unmount;
  });

  afterEach(() => {
    global.unmountGameState();
    global.unmountActualTableauSize();

    global.setGameState = null;
    global.unmountGameState = null;
    global.setActualTableauSize = null;
    global.unmountActualTableauSize = null;
  });

  it('renders a LoadingIndicator', async () => {
    const numCards = 18;

    await act(() => global.setGameState(GameState.Searching));

    const { container } = render(
      <LoadingIndicator
        imageLoaded={new Array(numCards).fill(false)}
        longWaitMsgVisible={false}
      />
    );

    await waitFor(() => {
      const spinner = container.querySelector('#loadingIndicator');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('says "Searching..." when the GameState is Searching', async () => {
    const numCards = 10;
    await act(() => {
      global.setGameState(GameState.Searching);
      global.setActualTableauSize(numCards);
    });

    render(
      <LoadingIndicator
        imageLoaded={new Array(numCards).fill(true)}
        longWaitMsgVisible={false}
      />
    );

    await waitFor(() => {
      const text = screen.queryByText(/searching.../i);
      expect(text).toBeInTheDocument();
    });
  });

  it('says "Loading..." when the GameState is Loading', async () => {
    const numCards = 12;
    await act(() => {
      global.setGameState(GameState.Loading);
      global.setActualTableauSize(numCards);
    });

    render(
      <LoadingIndicator
        imageLoaded={new Array(numCards).fill(false)}
        longWaitMsgVisible={false}
      />
    );

    await waitFor(() => {
      const text = screen.queryByText(/loading.../i);
      expect(text).toBeInTheDocument();
    });
  });
});
