import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { IGif } from '@giphy/js-types';
import { GameState, GifErrorState } from './Game.typedefs';
import OverlayCloseButton from '../elements/searchOverlay/OverlayCloseButton';
import SearchForm from '../elements/searchOverlay/SearchForm';
import LoadingIndicator from '../elements/searchOverlay/LoadingIndicator';
import styles from '@/styles/layout/SearchOverlay.module.scss';

export type SearchOverlayProps = {
  gameState: GameState;
  imageLoaded: boolean[];
  resetImageLoaded: (numCards: number) => void;
  overlayVisible: boolean;
  tableauSize: string;
  actualTableauSize: number;
  setTableauSize: Dispatch<SetStateAction<string>>;
  updateImageData: (data: IGif[]) => void;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  hideSearchOverlay: () => void;
  setGifErrorState: Dispatch<SetStateAction<GifErrorState>>;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  stopConfetti: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    gameState,
    imageLoaded,
    resetImageLoaded,
    overlayVisible,
    tableauSize,
    actualTableauSize,
    setTableauSize,
    updateImageData,
    resetCards,
    setGameState,
    hideSearchOverlay,
    setGifErrorState,
    setAlertVisible,
    stopConfetti,
  } = props;
  const classes = `${styles.overlayClosed} ${
    overlayVisible ? styles.overlayOpen : ''
  }`;

  const isFetchingGifs =
    gameState === GameState.Searching || gameState === GameState.Loading;

  return (
    <div id={styles.searchOverlay} className={classes}>
      {!isFetchingGifs && (
        <>
          <SearchForm
            tableauSize={tableauSize}
            setTableauSize={setTableauSize}
            updateImageData={updateImageData}
            resetImageLoaded={resetImageLoaded}
            resetCards={resetCards}
            setGameState={setGameState}
            setGifErrorState={setGifErrorState}
            setAlertVisible={setAlertVisible}
            stopConfetti={stopConfetti}
          />
          <OverlayCloseButton hideOverlay={hideSearchOverlay} />
        </>
      )}
      {isFetchingGifs && (
        <LoadingIndicator
          gameState={gameState}
          imageLoaded={imageLoaded}
          actualTableauSize={actualTableauSize}
        />
      )}
    </div>
  );
}
