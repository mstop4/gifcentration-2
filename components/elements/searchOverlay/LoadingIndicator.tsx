import React, { ReactElement } from 'react';
import { GameState } from '../../layout/Game.typedefs';
import Spinner from '../ui/Spinner';
import styles from '@/styles/elements/searchOverlay/LoadingIndicator.module.scss';

export type LoadingIndicatorProps = {
  gameState: GameState;
  imageLoaded: boolean[];
  actualTableauSize: number;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { gameState, imageLoaded, actualTableauSize } = props;
  const numImagesLoaded = imageLoaded.reduce(
    (total, current) => (current ? total + 1 : total),
    0
  );

  return (
    <div id={styles.loadingIndicator}>
      <Spinner />
      {gameState === GameState.Searching && <span>Searching...</span>}
      {gameState === GameState.Loading && (
        <>
          <span>Loading...</span>
          <progress value={numImagesLoaded} max={actualTableauSize}></progress>
        </>
      )}
    </div>
  );
}
