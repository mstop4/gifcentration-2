import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from '@/styles/layout/SearchOverlay.module.scss';
import OverlayCloseButton from '../elements/OverlayCloseButton';
import SearchForm from '../elements/SearchForm';
import { GameState } from './Game';

export type SearchOverlayProps = {
  overlayVisible: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tableauSize: number;
  setNumCards: Dispatch<SetStateAction<number>>;
  getGifs: () => Promise<number>;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  hideSearchOverlay: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    overlayVisible,
    searchQuery,
    setSearchQuery,
    tableauSize,
    setNumCards,
    getGifs,
    resetCards,
    setGameState,
    hideSearchOverlay,
  } = props;
  const classes = `${styles.overlayBase} ${
    overlayVisible ? styles.overlayOpen : ''
  }`;

  return (
    <div id={styles.searchOverlay} className={classes}>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tableauSize={tableauSize}
        setNumCards={setNumCards}
        getGifs={getGifs}
        resetCards={resetCards}
        setGameState={setGameState}
        hideSearchOverlay={hideSearchOverlay}
      />
      <OverlayCloseButton hideOverlay={hideSearchOverlay} />
    </div>
  );
}
