import React, { ReactElement } from 'react';
import { GameState } from '../layout/Game';

export type LoadingIndicatorProps = {
  gameState: GameState;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { gameState } = props;

  return (
    <div>
      {gameState === GameState.Searching && 'Searching...'}
      {gameState === GameState.Loading && 'Loading...'}
    </div>
  );
}
