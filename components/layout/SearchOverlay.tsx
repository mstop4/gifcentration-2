import { useGameStore, useUIVisibleStore } from '../game/Game.stores';
import OverlayCloseButton from '../elements/searchOverlay/OverlayCloseButton';
import SearchForm from '../elements/searchOverlay/SearchForm';
import LoadingIndicator from '../elements/searchOverlay/LoadingIndicator';
import { SortedGifData } from '../../helpers/gif';
import type { Dispatch, ReactElement, SetStateAction } from 'react';
import { GameState, GifErrorState } from '../game/Game.typedefs';
import { TopSearchResult } from '../../lib/mongodb/helpers';
import styles from '@/styles/layout/SearchOverlay.module.scss';

export type SearchOverlayProps = {
  imageLoaded: boolean[];
  resetImageLoaded: (numCards: number) => void;
  topSearches: TopSearchResult[];
  updateImageData: (data: SortedGifData[]) => void;
  resetCards: (numCards: number) => void;
  setGifErrorState: Dispatch<SetStateAction<GifErrorState>>;
  startLoadTimers: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    imageLoaded,
    resetImageLoaded,
    topSearches,
    updateImageData,
    resetCards,
    setGifErrorState,
    startLoadTimers,
  } = props;

  const gameState = useGameStore(state => state.gameState);
  const overlayVisible = useUIVisibleStore(state => state.overlay);
  const longWaitMsgVisible = useUIVisibleStore(state => state.longWaitMsg);

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
            topSearches={topSearches}
            updateImageData={updateImageData}
            resetImageLoaded={resetImageLoaded}
            resetCards={resetCards}
            setGifErrorState={setGifErrorState}
            startLoadTimers={startLoadTimers}
          />
          <OverlayCloseButton />
        </>
      )}
      {isFetchingGifs && (
        <LoadingIndicator
          imageLoaded={imageLoaded}
          longWaitMsgVisible={longWaitMsgVisible}
        />
      )}
    </div>
  );
}
