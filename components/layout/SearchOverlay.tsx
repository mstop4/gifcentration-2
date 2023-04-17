import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from '@/styles/layout/SearchOverlay.module.scss';
import OverlayCloseButton from '../elements/OverlayCloseButton';
import SearchForm from '../elements/SearchForm';
import { GameState } from './Game';
import { Rating } from '@giphy/js-fetch-api';
import LoadingIndicator from '../elements/LoadingIndicator';

export type SearchOverlayProps = {
  gameState: GameState;
  overlayVisible: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tableauSize: number;
  setTableauSize: Dispatch<SetStateAction<number>>;
  rating: Rating;
  setRating: Dispatch<SetStateAction<Rating>>;
  getGifs: () => Promise<number>;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  hideSearchOverlay: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    gameState,
    overlayVisible,
    searchQuery,
    setSearchQuery,
    tableauSize,
    setTableauSize,
    rating,
    setRating,
    getGifs,
    resetCards,
    setGameState,
    hideSearchOverlay,
  } = props;
  const classes = `${styles.overlayBase} ${
    overlayVisible ? styles.overlayOpen : ''
  }`;

  const isFetchingGifs =
    gameState === GameState.Searching || gameState === GameState.Loading;

  return (
    <div id={styles.searchOverlay} className={classes}>
      {!isFetchingGifs && (
        <>
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            tableauSize={tableauSize}
            setTableauSize={setTableauSize}
            rating={rating}
            setRating={setRating}
            getGifs={getGifs}
            resetCards={resetCards}
            setGameState={setGameState}
            hideSearchOverlay={hideSearchOverlay}
          />
          <OverlayCloseButton hideOverlay={hideSearchOverlay} />
        </>
      )}
      {isFetchingGifs && <LoadingIndicator gameState={gameState} />}
    </div>
  );
}
