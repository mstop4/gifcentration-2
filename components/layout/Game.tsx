import React, { ReactElement, useCallback, useRef, useState } from 'react';
import Tableau from '../elements/Tableau';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import pairShuffler from '../../helpers/pairShuffler';
import styles from '@/styles/layout/Game.module.scss';
import { useMountEffect } from '@react-hookz/web';

const numCards = 18;

export default function Game(): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);

  const imageIndexes = useRef<number[]>([]); // use memo?
  const selectedCardIndexes = useRef<number[]>([]);

  useMountEffect(() => resetCards());

  const addSelectedCardIndex = (index: number): void => {
    selectedCardIndexes.current.push(index);
  };

  const resetSelectedCardIndexes = (): void => {
    selectedCardIndexes.current = [];
  };

  const resetCards = useCallback(() => {
    setFlipped(() => Array(numCards).fill(false));
    setMatched(() => Array(numCards).fill(false));
    selectedCardIndexes.current = [];
    imageIndexes.current = pairShuffler(numCards / 2);
  }, []);

  return (
    <Layout>
      <Header resetCards={resetCards} />
      <div id={styles.content}>
        <Tableau
          flipped={flipped}
          setFlipped={setFlipped}
          matched={matched}
          setMatched={setMatched}
          numCards={numCards}
          imageIndexes={imageIndexes.current}
          selectedCardIndexes={selectedCardIndexes.current}
          addSelectedCardIndex={addSelectedCardIndex}
          resetSelectedCardIndexes={resetSelectedCardIndexes}
        />
      </div>
      <Footer />
    </Layout>
  );
}
