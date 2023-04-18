import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';
import '@testing-library/jest-dom';
import { GameState } from '../layout/Game';

describe('LoadingIndicator', () => {
  it('renders a LoadingIndicator', () => {
    const { container } = render(
      <LoadingIndicator
        gameState={GameState.Searching}
        numImagesLoaded={0}
        actualTableauSize={18}
      />
    );

    const spinner = container.querySelector('#loadingIndicator');
    expect(spinner).toBeInTheDocument();
  });

  it('says "Searching..." when the GameState is Searching', async () => {
    render(
      <LoadingIndicator
        gameState={GameState.Searching}
        numImagesLoaded={0}
        actualTableauSize={18}
      />
    );

    const text = screen.queryByText(/searching.../i);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });

  it('says "Loading..." when the GameState is Loading', async () => {
    render(
      <LoadingIndicator
        gameState={GameState.Loading}
        numImagesLoaded={0}
        actualTableauSize={18}
      />
    );

    const text = screen.queryByText(/loading.../i);
    await waitFor(() => {
      expect(text).toBeInTheDocument();
    });
  });
});
