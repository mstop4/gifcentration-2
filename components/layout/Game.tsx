import React, { ReactElement, useRef, useState } from 'react';
import { useFunctionalState, useMountEffect } from '@react-hookz/web';
import Tableau from '../elements/Tableau';
import Layout from './Layout';
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

export enum GameState {
  Idle,
  Loading,
  Playing,
  Finished,
}

export enum ErrorState {
  Ok,
  NotEnoughGifs,
  UnknownError,
}

const defaultTableauSize = 18;

export default function Game(): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);
  const [tableauSize, setTableauSize] = useState(defaultTableauSize);
  const [rating, setRating] = useState<Rating>('g');

  const imageData = useRef<IGif[]>([]);
  const imageIndexes = useRef<number[]>([]);
  const selectedCardIndexes = useRef<number[]>([]);

  // Initialize game
  useMountEffect(async () => {
    setTimeout(() => toggleSearchOverlay(true), 1000);
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
    console.log(json);

    return json.length;
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
    if (gameState === GameState.Loading) return;
    console.log(`Has ${numCards} cards...`);

    setGameState(() => GameState.Loading);
    setFlipped(() => Array(numCards).fill(true));
    setMatched(() => Array(numCards).fill(true));
    selectedCardIndexes.current = [];

    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);

    console.log(`Setting up ${numCards / 2} pairs...`);
    imageIndexes.current = pairShuffler(numCards / 2);

    setTimeout(() => {
      setGameState(() => GameState.Playing);
    }, 1000);
  };

  const addSelectedCardIndex = (index: number): void => {
    selectedCardIndexes.current.push(index);
  };

  const resetSelectedCardIndexes = (): void => {
    selectedCardIndexes.current = [];
  };

  return (
    <Layout>
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
          selectedCardIndexes={selectedCardIndexes.current}
          addSelectedCardIndex={addSelectedCardIndex}
          resetSelectedCardIndexes={resetSelectedCardIndexes}
        />
      </div>
      <Footer />
      <SearchOverlay
        overlayVisible={overlayVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tableauSize={tableauSize}
        setTableauSize={setTableauSize}
        rating={rating}
        setRating={setRating}
        getGifs={getGifs}
        resetCards={resetCards}
        setGameState={setGameState}
        hideSearchOverlay={(): void => toggleSearchOverlay(false)}
      />
    </Layout>
  );
}
