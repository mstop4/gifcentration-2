import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { useMountEffect } from '@react-hookz/web';
import randomWords from 'random-words';
import Tableau from '../elements/Tableau';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import pairShuffler from '../../helpers/pairShuffler';
import styles from '@/styles/layout/Game.module.scss';
import SearchOverlay from './SearchOverlay';
import sleep from '../../helpers/timeout';

const numCards = 18;

export enum GameState {
  Started,
  Loading,
  Playing,
  Finished,
}

export default function Game(): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameState, setGameState] = useState<GameState>(GameState.Started);

  const imageIndexes = useRef<number[]>([]); // use memo?
  const imageUrls = useRef<string[]>([]);
  const selectedCardIndexes = useRef<number[]>([]);

  useMountEffect(async () => {
    await getGifs();
    resetCards();
  });

  const getGifs = async (): Promise<void> => {
    await sleep(2000);
    imageUrls.current = randomWords(numCards / 2);
  };

  const toggleSearchOverlay = (visible: boolean): void => {
    setOverlayVisible(() => visible);
  };

  const resetCards = useCallback(async () => {
    setGameState(() => GameState.Loading);
    setFlipped(() => Array(numCards).fill(false));
    setMatched(() => Array(numCards).fill(false));
    selectedCardIndexes.current = [];

    setTimeout(() => {
      imageIndexes.current = pairShuffler(numCards / 2);
      setGameState(() => GameState.Playing);
    }, 1000);
  }, []);

  const addSelectedCardIndex = (index: number): void => {
    selectedCardIndexes.current.push(index);
  };

  const resetSelectedCardIndexes = (): void => {
    selectedCardIndexes.current = [];
  };

  return (
    <Layout>
      <Header
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
          numCards={numCards}
          imageIndexes={imageIndexes.current}
          imageUrls={imageUrls.current}
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
        getGifs={getGifs}
        setGameState={setGameState}
        hideSearchOverlay={(): void => toggleSearchOverlay(false)}
      />
    </Layout>
  );
}
