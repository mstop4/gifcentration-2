import React, { ReactElement, useRef, useState } from 'react';
import { useMountEffect } from '@react-hookz/web';
import randomWords from 'random-words';
import Tableau from '../elements/Tableau';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import pairShuffler from '../../helpers/pairShuffler';
import styles from '@/styles/layout/Game.module.scss';
import SearchOverlay from './SearchOverlay';
import getRectangleDimensions, {
  RectangleDimensions,
} from '../../helpers/getRectangleDimensions';
import sleep from '../../helpers/timeout';
import { HomeProps } from '@/pages';

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

export default function Game(props: HomeProps): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);
  const [tableauSize, setTableauSize] = useState(18);

  const imageIndexes = useRef<number[]>([]);
  const imageUrls = useRef<string[]>([]);
  const selectedCardIndexes = useRef<number[]>([]);

  // Initialize game
  useMountEffect(async () => {
    setTimeout(() => toggleSearchOverlay(true), 1000);
  });

  // Gets GIFs from API service
  const getGifs = async (): Promise<number> => {
    console.log(`Getting ${tableauSize / 2} pairs...`);
    await sleep(2000);
    imageUrls.current = randomWords(tableauSize / 2 - 2);
    console.log(imageUrls.current);

    return imageUrls.current.length;
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
    if (gameState === GameState.Idle || gameState === GameState.Loading) return;
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
          imageUrls={imageUrls.current}
          selectedCardIndexes={selectedCardIndexes.current}
          addSelectedCardIndex={addSelectedCardIndex}
          resetSelectedCardIndexes={resetSelectedCardIndexes}
          testGif={props.gif}
        />
      </div>
      <Footer />
      <SearchOverlay
        overlayVisible={overlayVisible}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tableauSize={tableauSize}
        setNumCards={setTableauSize}
        getGifs={getGifs}
        resetCards={resetCards}
        setGameState={setGameState}
        hideSearchOverlay={(): void => toggleSearchOverlay(false)}
      />
    </Layout>
  );
}
