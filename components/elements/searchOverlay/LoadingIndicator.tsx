import React from 'react';
import type { ReactElement } from 'react';
import { GameState } from '../../layout/Game.typedefs';
import Spinner from '../ui/Spinner';
import styles from '@/styles/elements/searchOverlay/LoadingIndicator.module.scss';

export type LoadingIndicatorProps = {
  gameState: GameState;
  imageLoaded: boolean[];
  actualTableauSize: number;
  longWaitMsgVisible: boolean;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { gameState, imageLoaded, actualTableauSize, longWaitMsgVisible } =
    props;
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
          <span>{longWaitMsgVisible ? 'Still ' : ''} Pre-loading GIFs...</span>
          <progress value={numImagesLoaded} max={actualTableauSize}></progress>
        </>
      )}
    </div>
  );
}
