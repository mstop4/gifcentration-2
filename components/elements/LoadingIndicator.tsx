import React, { ReactElement } from 'react';
import { GameState } from '../layout/Game';
import Spinner from './Spinner';
import styles from '@/styles/elements/LoadingIndicator.module.scss';

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
