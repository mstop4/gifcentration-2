import { useGameStore, useUIVisibleStore } from '../../stores/stores';
import OverlayCloseButton from '../elements/searchOverlay/OverlayCloseButton';
import SearchForm from '../elements/searchOverlay/SearchForm';
import ImageLoadingIndicator from '../elements/searchOverlay/ImageLoadingIndicator';
import { SortedGifData } from '../../helpers/gif';
import type { ReactElement } from 'react';
import { GameState } from '../game/Game.typedefs';
import { TopSearchResult } from '../../lib/mongodb/helpers';
import styles from '@/styles/layout/SearchOverlay.module.scss';

export type SearchOverlayProps = {
  resetImageLoaded: (numCards: number) => void;
  topSearches: TopSearchResult[];
  updateImageData: (data: SortedGifData[]) => void;
  resetCards: (numCards: number) => void;
  startLoadTimers: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const {
    resetImageLoaded,
    topSearches,
    updateImageData,
    resetCards,
    startLoadTimers,
  } = props;

  const gameState = useGameStore(state => state.gameState);
  const overlayVisible = useUIVisibleStore(state => state.overlay);

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
            startLoadTimers={startLoadTimers}
          />
          <OverlayCloseButton />
        </>
      )}
      {isFetchingGifs && <ImageLoadingIndicator />}
    </div>
  );
}
