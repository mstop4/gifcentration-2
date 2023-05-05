import OverlayCloseButton from '../elements/searchOverlay/OverlayCloseButton';
import SearchForm from '../elements/searchOverlay/SearchForm';
import LoadingIndicator from '../elements/searchOverlay/LoadingIndicator';
import { SortedGifData } from '../../helpers/gif';
import type { Dispatch, ReactElement, SetStateAction } from 'react';
import { GameState, GifErrorState } from '../game/Game.typedefs';
import { TopSearchResult } from '../../lib/mongodb/helpers';
import styles from '@/styles/layout/SearchOverlay.module.scss';

export type SearchOverlayProps = {
  gameState: GameState;
  imageLoaded: boolean[];
  resetImageLoaded: (numCards: number) => void;
  overlayVisible: boolean;
  tableauSize: string;
  actualTableauSize: number;
  longWaitMsgVisible: boolean;
  topSearches: TopSearchResult[];
  setTableauSize: Dispatch<SetStateAction<string>>;
  updateImageData: (data: SortedGifData[]) => void;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  hideSearchOverlay: () => void;
  setGifErrorState: Dispatch<SetStateAction<GifErrorState>>;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  stopConfetti: () => void;
  startLoadTimers: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    gameState,
    imageLoaded,
    resetImageLoaded,
    overlayVisible,
    tableauSize,
    actualTableauSize,
    longWaitMsgVisible,
    topSearches,
    setTableauSize,
    updateImageData,
    resetCards,
    setGameState,
    hideSearchOverlay,
    setGifErrorState,
    setAlertVisible,
    stopConfetti,
    startLoadTimers,
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
            topSearches={topSearches}
            setTableauSize={setTableauSize}
            updateImageData={updateImageData}
            resetImageLoaded={resetImageLoaded}
            resetCards={resetCards}
            setGameState={setGameState}
            setGifErrorState={setGifErrorState}
            setAlertVisible={setAlertVisible}
            stopConfetti={stopConfetti}
            startLoadTimers={startLoadTimers}
          />
          <OverlayCloseButton hideOverlay={hideSearchOverlay} />
        </>
      )}
      {isFetchingGifs && (
        <LoadingIndicator
          gameState={gameState}
          imageLoaded={imageLoaded}
          actualTableauSize={actualTableauSize}
          longWaitMsgVisible={longWaitMsgVisible}
        />
      )}
    </div>
  );
}
