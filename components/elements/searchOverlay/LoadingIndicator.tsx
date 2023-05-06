import React from 'react';
import { useGameStore } from '../../game/Game.stores';
import Spinner from '../ui/Spinner';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.typedefs';
import styles from '@/styles/elements/searchOverlay/LoadingIndicator.module.scss';

export type LoadingIndicatorProps = {
  imageLoaded: boolean[];
  longWaitMsgVisible: boolean;
};

export default function LoadingIndicator(
  props: LoadingIndicatorProps
): ReactElement {
  const { imageLoaded, longWaitMsgVisible } = props;
  const gameState = useGameStore(state => state.gameState);
  const actualTableauSize = useGameStore(state => state.actualTableauSize);

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
