import React, { ReactElement } from 'react';
import { GameState } from '../layout/Game';

export type LoadingIndicatorProps = {
  gameState: GameState;
  numImagesLoaded: number;
  tableauSize: number;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { gameState, numImagesLoaded, tableauSize } = props;

  return (
    <div>
      {gameState === GameState.Searching && 'Searching...'}
      {gameState === GameState.Loading &&
        `Loading ${numImagesLoaded}/${tableauSize}`}
    </div>
  );
}
