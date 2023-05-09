import React from 'react';
import {
  useGameStore,
  useImageDataStore,
  useUIVisibleStore,
} from '../../../stores/stores';
import Spinner from '../ui/Spinner';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.typedefs';
import styles from '@/styles/elements/searchOverlay/ImageLoadingIndicator.module.scss';

export default function ImageLoadingIndicator(): ReactElement {
  const gameState = useGameStore(state => state.gameState);
  const actualTableauSize = useGameStore(state => state.actualTableauSize);
  const imageLoaded = useImageDataStore(state => state.imageLoaded);
  const longWaitMsgVisible = useUIVisibleStore(state => state.longWaitMsg);

  const numImagesLoaded = imageLoaded.reduce(
    (total, current) => (current ? total + 1 : total),
    0
  );

  return (
    <div id={styles.imageLoadingIndicator}>
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
