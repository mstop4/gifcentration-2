import React from 'react';
import {
  useGameStore,
  useImageDataStore,
  useUIVisibleStore,
} from '../../../stores/stores';
import Spinner from '../ui/Spinner';
import type { ReactElement } from 'react';
import { GameState, ImageLoadingStatus } from '../../game/Game.enums';
import styles from '@/styles/elements/searchOverlay/ImageLoadingIndicator.module.scss';

export default function ImageLoadingIndicator(): ReactElement {
  const gameState = useGameStore(state => state.gameState);
  const actualTableauSize = useGameStore(state => state.actualTableauSize);
  const setGameState = useGameStore(state => state.setGameState);
  const imageLoaded = useImageDataStore(state => state.imageLoaded);
  const loadingStatus = useUIVisibleStore(state => state.imageLoadingStatus);
  const setUIVisibility = useUIVisibleStore.setState;

  const onStartGameClick = () => {
    setUIVisibility({ overlay: false });
    setTimeout(() => setGameState(GameState.Playing), 500);
  };

  const numImagesLoaded = imageLoaded.reduce(
    (total, current) => (current ? total + 1 : total),
    0,
  );

  let loadingMsg;

  if (loadingStatus === ImageLoadingStatus.OK) {
    loadingMsg = 'Preloading GIFs...';
  } else {
    loadingMsg = 'Still Preloading GIFs...';
  }

  return (
    <div id={styles.imageLoadingIndicator}>
      <Spinner />
      {gameState === GameState.Searching && <span>Searching...</span>}
      {gameState === GameState.Loading && (
        <>
          <span>{loadingMsg}</span>
          <progress
            id={styles.loadingProgress}
            value={numImagesLoaded}
            max={actualTableauSize}
          ></progress>
          {loadingStatus === ImageLoadingStatus.Timeout && (
            <button id={styles.startGameButton} onClick={onStartGameClick}>
              Start Game Now
            </button>
          )}
        </>
      )}
    </div>
  );
}
