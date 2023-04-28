import { useEffect, useReducer, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useMediaQuery, useMountEffect, useWindowSize } from '@react-hookz/web';
import Header from './Header';
import SearchOverlay from './SearchOverlay';
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
import {
  ElementVisibility,
  ElementVisibilityAction,
  GameState,
  GifErrorState,
  TitleVisibility,
  TitleVisibilityAction,
} from './Game.typedefs';
import type { ReactElement } from 'react';
import styles from '@/styles/layout/Game.module.scss';

const defaultTableauSize = 18;
const confettiAmount = 200;
const confettiDuration = 10000;

export default function Game(): ReactElement {
  const reduceMotions = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [gameState, setGameState] = useState(GameState.Idle);

  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const [tableauSize, setTableauSize] = useState(defaultTableauSize.toString());
  const actualTableauSize = useRef(defaultTableauSize);

  const imageData = useRef<SortedGifData[]>([]);
  const imageIndexes = useRef<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const [gifErrorState, setGifErrorState] = useState(GifErrorState.Ok);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const clickHereVisibleReducer = (
    state: ElementVisibility,
    action: ElementVisibilityAction
  ): ElementVisibility => ({ ...state, [action.prop]: action.value });

  const [clickHereVisible, dispatchClickHereVisible] = useReducer(
    clickHereVisibleReducer,
    {
      visible: false,
      rendered: true,
    }
  );

  const titleVisibleReducer = (
    state: TitleVisibility,
    action: TitleVisibilityAction
  ): TitleVisibility => {
    const newState = { ...state };

    switch (action.type) {
      case 'showHeader':
        newState.headerVisible = true;
        break;

      case 'showTitle':
        newState.titleVisible = true;
        break;

      case 'showSubtitle':
        newState.subtitleVisible = true;
        break;

      case 'hideTitle':
        newState.titleVisible = false;
        break;

      case 'hideSubtitle':
        newState.subtitleVisible = false;
        break;

      case 'removeTitle':
        newState.titleRendered = false;
        break;
    }

    return newState;
  };

  const [titleVisible, dispatchTitleVisible] = useReducer(titleVisibleReducer, {
    headerVisible: false,
    titleRendered: true,
    titleVisible: false,
    subtitleVisible: false,
  });

  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);
  const windowSize = useRef<{ appWidth: number; appHeight: number }>({
    appWidth: 100,
    appHeight: 100,
  });

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

    setTimeout(() => dispatchTitleVisible({ type: 'showTitle' }), 0);
    setTimeout(() => dispatchTitleVisible({ type: 'showSubtitle' }), 750);
    setTimeout(
      () => dispatchClickHereVisible({ prop: 'visible', value: true }),
      2000
    );
  });

  useEffect(() => {
    if (gameState !== GameState.Loading) return;

    // Check if all GIFs have been loaded, start game once that happens
    const allLoaded = imageLoaded.every(value => value);

    if (!allLoaded) return;
    console.log('all ok');

    setTimeout(() => {
      toggleSearchOverlay(false);
    }, 500);
    setTimeout(() => {
      setGameState(GameState.Playing);
    }, 1000);
  }, [imageLoaded, gameState]);

  const updateImageData = (data: SortedGifData[]): void => {
    imageData.current = data;
    actualTableauSize.current = data.length * 2;
    console.log(data);
  };

  // Updates CSS grid dimensions for tableau
  const updateGridDimensions = (rect: RectangleDimensions): void => {
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
  const resetCards = (numCards: number = parseInt(tableauSize)): void => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;
    console.log(`Has ${numCards} cards...`);

    setGameState(GameState.Loading);
    setFlipped(Array(numCards).fill(false));
    setMatched(Array(numCards).fill(false));
    setSelectedCardIndexes([]);

    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);

    console.log(`Setting up ${numCards / 2} pairs...`);
    imageIndexes.current = pairShuffler(numCards / 2);
  };

  // Marks a GIF as loaded
  const updateImageLoaded = (index: number): void => {
    if (index >= 0 && index < imageLoaded.length) {
      setImageLoaded(prev =>
        prev.map((value, i) => (i === index ? true : value))
      );
    } else {
      console.warn(`Index ${index} out of bounds 0-${imageLoaded.length - 1}`);
    }
  };

  // Resets and resizes imageLoaded array
  const resetImageLoaded = (numCards: number): void => {
    setImageLoaded(() => new Array(numCards).fill(false));
  };

  // Shows/hides search overlay
  const toggleSearchOverlay = (visible: boolean): void => {
    setOverlayVisible(visible);
  };

  // Shows/hides confetti overlay
  const toggleConfetti = (visible: boolean): void => {
    setConfettiVisible(visible);

    if (confettiTimeout.current != null) {
      clearTimeout(confettiTimeout.current);
    }

    if (visible) {
      confettiTimeout.current = setTimeout(() => {
        setConfettiVisible(false);
      }, confettiDuration);
    }
  };

  return (
    <main className={styles.main}>
      <Header
        gameState={gameState}
        resetCards={resetCards}
        titleVisible={titleVisible}
        dispatchTitleVisible={dispatchTitleVisible}
        dispatchClickHereVisible={dispatchClickHereVisible}
        showSearchOverlay={(): void => toggleSearchOverlay(true)}
      />
      <div id={styles.content}>
        {titleVisible.titleRendered && <Title titleVisible={titleVisible} />}
        {clickHereVisible.rendered && (
          <ClickHere
            visible={clickHereVisible.visible}
            titleVisible={titleVisible}
            dispatchTitleVisible={dispatchTitleVisible}
            dispatchClickHereVisible={dispatchClickHereVisible}
            showSearchOverlay={(): void => toggleSearchOverlay(true)}
          />
        )}
        <Tableau
          gameState={gameState}
          setGameState={setGameState}
          reduceMotions={reduceMotions ?? false}
          flipped={flipped}
          setFlipped={setFlipped}
          matched={matched}
          setMatched={setMatched}
          imageIndexes={imageIndexes.current}
          imageData={imageData.current}
          updateImageLoaded={updateImageLoaded}
          selectedCardIndexes={selectedCardIndexes}
          setSelectedCardIndexes={setSelectedCardIndexes}
          showConfetti={(): void => toggleConfetti(true)}
        />
      </div>
      {/* <Footer /> */}
      <Confetti
        width={windowSize.current.appWidth}
        height={windowSize.current.appHeight}
        numberOfPieces={confettiVisible ? confettiAmount : 0}
      />
      <SearchOverlay
        gameState={gameState}
        imageLoaded={imageLoaded}
        overlayVisible={overlayVisible}
        tableauSize={tableauSize}
        actualTableauSize={actualTableauSize.current}
        setTableauSize={setTableauSize}
        updateImageData={updateImageData}
        resetImageLoaded={resetImageLoaded}
        resetCards={resetCards}
        setGameState={setGameState}
        hideSearchOverlay={(): void => toggleSearchOverlay(false)}
        setGifErrorState={setGifErrorState}
        setAlertVisible={setAlertVisible}
        stopConfetti={(): void => toggleConfetti(false)}
      />
      <Alert gifErrorState={gifErrorState} alertVisible={alertVisible} />
    </main>
  );
}
