import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useMediaQuery, useMountEffect, useWindowSize } from '@react-hookz/web';
import {
  useClickHereVisibleStore,
  useGameStore,
  useImageDataStore,
  useTitleVisibleStore,
  useUIVisibleStore,
} from '../../stores/stores';
import Header from '../layout/Header';
import SearchOverlay from '../layout/SearchOverlay';
import Tableau from '../elements/game/Tableau';
import Alert from '../elements/ui/Alert';
import Title from '../elements/ui/Title';
import ClickHere from '../elements/ui/ClickHere';
import {
  RectangleDimensions,
  getRectangleDimensions,
  pairShuffler,
} from '../../helpers';
import { SortedGifData } from '../../helpers/gif';
import clientConfig from '../../config/clientConfig';
import { GameState } from './Game.typedefs';
import type { ReactElement } from 'react';
import { TopSearchResult } from '../../lib/mongodb/helpers';
import styles from '@/styles/layout/Game.module.scss';
import ImageLoadingIndicator from '../elements/searchOverlay/ImageLoadingIndicator';

export type GameProps = {
  topSearches: TopSearchResult[];
};

const { confettiAmount, confettiDuration, maxLoadWaitTime } = clientConfig.game;

export default function Game(props: GameProps): ReactElement {
  const reduceMotions = useMediaQuery('(prefers-reduced-motion: reduce)');
  const router = useRouter();
  const pathname = usePathname();
  const { topSearches } = props;

  // Picking states from stores must be done this way (i.e no destructuring store.getState())
  // Otherwise, Zustand might not trigger a rerender on React due to some shallow comparision
  // the store. https://medium.com/@nfailla93/zustand-in-react-dos-and-donts-5a608c26c68
  const gameState = useGameStore(state => state.gameState);
  const setGameState = useGameStore(state => state.setGameState);
  const setFlipped = useGameStore(state => state.setFlipped);
  const setMatched = useGameStore(state => state.setMatched);
  const setSelectedCardIndexes = useGameStore(
    state => state.setSelectedCardIndexes
  );
  const idealTableauSize = useGameStore(state => state.idealTableauSize);
  const setActualTableauSize = useGameStore(
    state => state.setActualTableauSize
  );

  const titleRendered = useTitleVisibleStore(state => state.titleRendered);
  const clickHereRendered = useClickHereVisibleStore(state => state.rendered);
  const setTitleVisibility = useTitleVisibleStore.setState;
  const setClickHereVisibility = useClickHereVisibleStore.setState;
  const setUIVisibility = useUIVisibleStore.setState;

  const setImageData = useImageDataStore(state => state.setImageData);
  const setImageIndexes = useImageDataStore(state => state.setImageIndexes);
  const imageLoaded = useImageDataStore(state => state.imageLoaded);
  const setImageLoaded = useImageDataStore(state => state.setImageLoaded);

  const confettiVisible = useUIVisibleStore(state => state.confetti);

  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);
  const windowSize = useRef<{ appWidth: number; appHeight: number }>({
    appWidth: 100,
    appHeight: 100,
  });
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const longWaitTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize game
  const { width: appWidth, height: appHeight } = useWindowSize();

  useMountEffect(() => {
    // Determine window size if on client
    if (typeof window !== undefined) {
      windowSize.current = {
        appWidth,
        appHeight,
      };
    }

    setTimeout(() => setTitleVisibility({ titleVisible: true }), 0);
    setTimeout(() => setTitleVisibility({ subtitleVisible: true }), 750);
    setTimeout(() => setClickHereVisibility({ visible: true }), 2000);
  });

  const updateImageData = (data: SortedGifData[]) => {
    setImageData(data);
    setActualTableauSize(data.length * 2);
    console.log(data);
  };

  // Updates CSS grid dimensions for tableau
  const updateGridDimensions = (rect: RectangleDimensions) => {
    const { majorAxisSize, minorAxisSize } = rect;

    document.documentElement.style.setProperty(
      '--major-axis-size',
      `${majorAxisSize}`
    );

    document.documentElement.style.setProperty(
      '--minor-axis-size',
      `${minorAxisSize}`
    );
  };

  // Resets and reshuffles states passed to tableau
  const resetCards = (numCards: number = parseInt(idealTableauSize)) => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;
    console.log(`Has ${numCards} cards...`);

    setGameState(GameState.Loading);
    setFlipped({ type: 'clear', payload: numCards });
    setMatched({ type: 'clear', payload: numCards });
    setSelectedCardIndexes({ type: 'clear', payload: 0 });

    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);

    console.log(`Setting up ${numCards / 2} pairs...`);
    setImageIndexes(pairShuffler(numCards / 2));
  };

  // Marks a GIF as loaded
  const updateImageLoaded = (index: number) => {
    if (index >= 0 && index < imageLoaded.length) {
      setImageLoaded({ type: 'set', payload: index });
    } else {
      console.warn(`Index ${index} out of bounds 0-${imageLoaded.length - 1}`);
    }
  };

  // Resets and resizes imageLoaded array
  const resetImageLoaded = (numCards: number) => {
    setImageLoaded({ type: 'clear', payload: numCards });
  };

  // Sets timers connected to loading UI indicators
  const startLoadTimers = () => {
    setUIVisibility({ longWaitMsg: false });
    loadingTimeout.current = setTimeout(() => {
      setUIVisibility({ overlay: false });
      loadingTimeout.current = null;
      setTimeout(() => setGameState(GameState.Playing), 500);
    }, maxLoadWaitTime);
    longWaitTimeout.current = setTimeout(() => {
      setUIVisibility({ longWaitMsg: true });
      longWaitTimeout.current = null;
    }, maxLoadWaitTime / 2);
  };

  // Shows/hides search overlay
  const toggleSearchOverlay = useCallback(
    (visible: boolean) => {
      setUIVisibility({ overlay: visible });
      if (visible) router.replace(pathname);
    },
    [pathname, router, setUIVisibility]
  );

  // Shows/hides confetti overlay
  const toggleConfetti = (visible: boolean) => {
    setUIVisibility({ confetti: visible });

    if (confettiTimeout.current != null) {
      clearTimeout(confettiTimeout.current);
      confettiTimeout.current = null;
    }

    if (visible) {
      confettiTimeout.current = setTimeout(() => {
        setUIVisibility({ confetti: false });
        confettiTimeout.current = null;
      }, confettiDuration);
    }
  };

  useEffect(() => {
    if (gameState !== GameState.Loading) return;

    // Check if all GIFs have been loaded, start game once that happens
    const allLoaded = imageLoaded.every(value => value);

    if (!allLoaded) return;
    console.log('all ok');

    if (loadingTimeout.current != null) {
      clearTimeout(loadingTimeout.current);
      loadingTimeout.current = null;
    }

    if (longWaitTimeout.current != null) {
      clearTimeout(longWaitTimeout.current);
      longWaitTimeout.current = null;
    }

    setTimeout(() => {
      toggleSearchOverlay(false);
    }, 500);
    setTimeout(() => {
      setGameState(GameState.Playing);
    }, 1000);
  }, [imageLoaded, gameState, setGameState, toggleSearchOverlay]);

  return (
    <>
      <Header
        resetCards={resetCards}
        showSearchOverlay={() => toggleSearchOverlay(true)}
      />
      <div id={styles.content}>
        {titleRendered && <Title />}
        {clickHereRendered && (
          <ClickHere showSearchOverlay={() => toggleSearchOverlay(true)} />
        )}
        <Tableau
          reduceMotions={reduceMotions ?? false}
          updateImageLoaded={updateImageLoaded}
          showConfetti={() => toggleConfetti(true)}
        />
      </div>
      <Confetti
        width={windowSize.current.appWidth}
        height={windowSize.current.appHeight}
        numberOfPieces={confettiVisible ? confettiAmount : 0}
      />
      <SearchOverlay
        topSearches={topSearches}
        updateImageData={updateImageData}
        resetImageLoaded={resetImageLoaded}
        resetCards={resetCards}
        startLoadTimers={startLoadTimers}
      />
      <Alert />
    </>
  );
}
