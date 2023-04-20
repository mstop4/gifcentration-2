import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from '@/styles/layout/SearchOverlay.module.scss';
import OverlayCloseButton from '../elements/OverlayCloseButton';
import SearchForm from '../elements/SearchForm';
import { GameState, GifErrorState } from './Game';
import { Rating } from '@giphy/js-fetch-api';
import LoadingIndicator from '../elements/LoadingIndicator';
import { IGif } from '@giphy/js-types';

export type SearchOverlayProps = {
  gameState: GameState;
  numImagesLoaded: number;
  resetImageLoaded: (numCards: number) => void;
  overlayVisible: boolean;
  tableauSize: number;
  actualTableauSize: number;
  setTableauSize: Dispatch<SetStateAction<number>>;
  rating: Rating;
  setRating: Dispatch<SetStateAction<Rating>>;
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
    numImagesLoaded,
    resetImageLoaded,
    overlayVisible,
    tableauSize,
    actualTableauSize,
    setTableauSize,
    rating,
    setRating,
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
            rating={rating}
            setRating={setRating}
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
          numImagesLoaded={numImagesLoaded}
          actualTableauSize={actualTableauSize}
        />
      )}
    </div>
  );
}
