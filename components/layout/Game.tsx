import React, { ReactElement, useRef, useState } from 'react';
import { useMountEffect, useWindowSize } from '@react-hookz/web';
import Tableau from '../elements/Tableau';
import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/layout/Game.module.scss';
import SearchOverlay from './SearchOverlay';
import { IGif } from '@giphy/js-types';
import {
  RectangleDimensions,
  getRectangleDimensions,
  pairShuffler,
} from '../../helpers';
import { Rating } from '@giphy/js-fetch-api';
import Alert from '../elements/Alert';
import Confetti from 'react-confetti';

export enum GameState {
  Idle = 'idle',
  Searching = 'searching',
  Loading = 'loading',
  Playing = 'playing',
  Finished = 'finished',
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
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);
  const [tableauSize, setTableauSize] = useState(defaultTableauSize);
  const [rating, setRating] = useState<Rating>('g');
  const [numImagesLoaded, setNumImagesLoaded] = useState<number>(0);
  const [gifErrorState, setGifErrorState] = useState<GifErrorState>(
    GifErrorState.Ok
  );
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const imageData = useRef<IGif[]>([]);
  const imageIndexes = useRef<number[]>([]);
  const imageLoaded = useRef<boolean[]>([]);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);
  const actualTableauSize = useRef<number>(defaultTableauSize);
  const selectedCardIndexes = useRef<number[]>([]);
  const windowSize = useRef<{ appWidth: number; appHeight: number }>({
    appWidth: 100,
    appHeight: 100,
  });

  // Initialize game
  const { width: appWidth, height: appHeight } = useWindowSize();

  useMountEffect(async () => {
    setTimeout(() => toggleSearchOverlay(true), 1000);
    if (typeof window !== undefined) {
      windowSize.current = {
        appWidth,
        appHeight,
      };
    }
  });

  // Gets GIFs from API service
  const getGifs = async (): Promise<number> => {
    console.log(`Getting ${tableauSize / 2} pairs...`);

    const searchParams = new URLSearchParams({
      q: searchQuery,
      limit: (tableauSize / 2).toString(),
      rating,
    });

    const response = await fetch('/api/search?' + searchParams);
    const json = await response.json();
    imageData.current = json;
    actualTableauSize.current = imageData.current.length * 2;
    console.log(imageData.current);

    return imageData.current.length;
  };

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

  const toggleSearchOverlay = (visible: boolean): void => {
    setOverlayVisible(() => visible);
  };

  const resetCards = (numCards: number = tableauSize): void => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;
    console.log(`Has ${numCards} cards...`);

    setGameState(() => GameState.Loading);
    setFlipped(() => Array(numCards).fill(false));
    setMatched(() => Array(numCards).fill(false));
    selectedCardIndexes.current = [];

    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);

    console.log(`Setting up ${numCards / 2} pairs...`);
    imageIndexes.current = pairShuffler(numCards / 2);
  };

  const addSelectedCardIndex = (index: number): void => {
    selectedCardIndexes.current.push(index);
  };

  const resetSelectedCardIndexes = (): void => {
    selectedCardIndexes.current = [];
  };

  const updateImageLoaded = (index: number): void => {
    if (index >= 0 && index < imageLoaded.current.length) {
      imageLoaded.current[index] = true;

      const newNumImagesLoaded = imageLoaded.current.reduce(
        (total, current) => (current ? total + 1 : total),
        0
      );
      setNumImagesLoaded(() => newNumImagesLoaded);

      if (newNumImagesLoaded === imageLoaded.current.length) {
        console.log('all ok');

        setTimeout(() => {
          toggleSearchOverlay(false);
        }, 500);
        setTimeout(() => {
          setGameState(() => GameState.Playing);
        }, 1000);
      }
    } else {
      console.warn(
        `Index ${index} out of bounds 0-${imageLoaded.current.length - 1}`
      );
    }
  };

  const resetImageLoaded = (numCards: number): void => {
    imageLoaded.current = new Array(numCards).fill(false);
    setNumImagesLoaded(() => 0);
  };

  const toggleConfetti = (visible: boolean): void => {
    console.log('confetti', visible);
    setShowConfetti(() => visible);

    if (confettiTimeout.current != null) {
      clearTimeout(confettiTimeout.current);
    }

    if (visible) {
      confettiTimeout.current = setTimeout(() => {
        setShowConfetti(() => false);
      }, confettiDuration);
    }
  };

  return (
    <main className={styles.main}>
      <Header
        gameState={gameState}
        resetCards={resetCards}
        showSearchOverlay={(): void => toggleSearchOverlay(true)}
      />
      <div id={styles.content}>
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
          selectedCardIndexes={selectedCardIndexes.current}
          addSelectedCardIndex={addSelectedCardIndex}
          resetSelectedCardIndexes={resetSelectedCardIndexes}
          showConfetti={(): void => toggleConfetti(true)}
        />
      </div>
      <Footer />
      <Confetti
        width={windowSize.current.appWidth}
        height={windowSize.current.appHeight}
        numberOfPieces={showConfetti ? confettiAmount : 0}
      />
      <SearchOverlay
        gameState={gameState}
        numImagesLoaded={numImagesLoaded}
        overlayVisible={overlayVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tableauSize={tableauSize}
        actualTableauSize={actualTableauSize.current}
        setTableauSize={setTableauSize}
        rating={rating}
        setRating={setRating}
        getGifs={getGifs}
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
