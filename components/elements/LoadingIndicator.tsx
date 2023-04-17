import React, { ReactElement } from 'react';
import { GameState } from '../layout/Game';

export type LoadingIndicatorProps = {
  gameState: GameState;
  numImagesLoaded: number;
  actualTableauSize: number;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { gameState, numImagesLoaded, actualTableauSize } = props;

  return (
    <div>
      {gameState === GameState.Searching && 'Searching...'}
      {gameState === GameState.Loading &&
        `Loading ${numImagesLoaded}/${actualTableauSize}`}
    </div>
  );
}
