import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useMountEffect, useWindowSize } from '@react-hookz/web';
import { IGif } from '@giphy/js-types';
import Tableau from '../elements/game/Tableau';
import Header from './Header';
import Footer from './Footer';
import SearchOverlay from './SearchOverlay';
import Alert from '../elements/ui/Alert';
import {
  RectangleDimensions,
  getRectangleDimensions,
  pairShuffler,
} from '../../helpers';
import styles from '@/styles/layout/Game.module.scss';
import Title from '../elements/ui/Title';
import ClickHere from '../elements/ui/ClickHere';

export enum GameState {
  Idle = 'idle',
  Searching = 'searching',
  Loading = 'loading',
  Playing = 'playing',
  Finished = 'finished',
}

export enum TitleState {
  Hidden,
  MainTitleOnly,
  MainFull,
  Mini,
}

export enum GifErrorState {
  Ok,
  NotEnoughGifs,
  NoGifs,
  UnknownError,
}

const defaultTableauSize = 18;
const confettiAmount = 200;
const confettiDuration = 10000;

export default function Game(): ReactElement {
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);

  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
  const [tableauSize, setTableauSize] = useState(defaultTableauSize);
  const actualTableauSize = useRef<number>(defaultTableauSize);

  const imageData = useRef<IGif[]>([]);
  const imageIndexes = useRef<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const [gifErrorState, setGifErrorState] = useState<GifErrorState>(
    GifErrorState.Ok
  );

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [confettiVisible, setConfettiVisible] = useState<boolean>(false);
  const [clickHereVisible, setClickHereVisible] = useState<boolean>(true);
  const [titleState, setTitleState] = useState<TitleState>(TitleState.Hidden);
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

  const updateImageData = (data: IGif[]): void => {
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
  const resetCards = (numCards: number = tableauSize): void => {
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
        setClickHereVisible={setClickHereVisible}
        showSearchOverlay={(): void => toggleSearchOverlay(true)}
      />
      <div id={styles.content}>
        <Title />
        {clickHereVisible && (
          <ClickHere
            setVisible={setClickHereVisible}
            showSearchOverlay={(): void => toggleSearchOverlay(true)}
          />
        )}
        <Tableau
          gameState={gameState}
          setGameState={setGameState}
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
      <Footer />
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
