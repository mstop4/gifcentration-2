import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ResetGameButton from './ResetGameButton';
import '@testing-library/jest-dom';
import { GameState } from '../../layout/Game';

describe('ResetGameButton', () => {
  it('renders a ResetGameButton', () => {
    const { container } = render(
      <ResetGameButton gameState={GameState.Playing} resetCards={jest.fn()} />
    );

    const card = container.querySelector('#resetGameButton');
    expect(card).toBeInTheDocument();
  });

  it('calls resetCards when clicked', () => {
    const resetCardsMock = jest.fn();
    const { container } = render(
      <ResetGameButton
        gameState={GameState.Playing}
        resetCards={resetCardsMock}
      />
    );

    const button = container.querySelector('#resetGameButton') as Element;
    fireEvent.click(button);
    expect(resetCardsMock).toBeCalled();
  });
});
