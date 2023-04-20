import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';
import '@testing-library/jest-dom';
import { GameState } from '../layout/Game';

describe('LoadingIndicator', () => {
  it('renders a LoadingIndicator', () => {
    const numCards = 18;
    const { container } = render(
      <LoadingIndicator
        gameState={GameState.Searching}
        imageLoaded={new Array(numCards).fill(false)}
        actualTableauSize={numCards}
      />
    );

    const spinner = container.querySelector('#loadingIndicator');
    expect(spinner).toBeInTheDocument();
  });

  it('says "Searching..." when the GameState is Searching', async () => {
    const numCards = 10;
    render(
      <LoadingIndicator
        gameState={GameState.Searching}
        imageLoaded={new Array(numCards).fill(false)}
        actualTableauSize={numCards}
      />
    );

    const text = screen.queryByText(/searching.../i);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });

  it('says "Loading..." when the GameState is Loading', async () => {
    const numCards = 12;
    render(
      <LoadingIndicator
        gameState={GameState.Loading}
        imageLoaded={new Array(numCards).fill(false)}
        actualTableauSize={numCards}
      />
    );

    const text = screen.queryByText(/loading.../i);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });
});
