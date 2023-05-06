import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';
import '@testing-library/jest-dom';
import { useGameStore } from '../../game/Game.stores';
import { GameState } from '../../game/Game.typedefs';
import { getZustandHooks } from '../../../helpers/zustandTest';

let zustandHooks;

describe('LoadingIndicator', () => {
  beforeAll(() => {
    zustandHooks = getZustandHooks(useGameStore);
  });

  beforeEach(() => {
    zustandHooks.reset();
  });

  afterAll(() => {
    zustandHooks.unmount();
    zustandHooks = null;
  });

  it('renders a LoadingIndicator', async () => {
    const numCards = 18;

    await act(() => zustandHooks.getState().setGameState(GameState.Searching));

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
      zustandHooks.getState().setGameState(GameState.Searching);
      zustandHooks.getState().setActualTableauSize(numCards);
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
      zustandHooks.getState().setGameState(GameState.Loading);
      zustandHooks.getState().setActualTableauSize(numCards);
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
