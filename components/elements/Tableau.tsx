import React, { ReactElement, useCallback, useRef, useState } from 'react';
import Card from './Card';
import styles from '@/styles/elements/Tableau.module.scss';
import pairShuffler from '../../helpers/pairShuffler';

const numPairs = 9;

export default function Tableau(): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(numPairs * 2).fill(false)
  );
  const [matched, setMatched] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const numFlipped = useRef(0);
  const cardIndices = useRef<number[]>(pairShuffler(numPairs)); // use memo?

  const handleCardClick = (index: number): void => {
    const newFlipped = { ...flipped };
    newFlipped[index] = !newFlipped[index];
    setFlipped(() => newFlipped);
  };

  const _resetCards = useCallback(() => {
    setFlipped(() => Array(numPairs * 2).fill(false));
    numFlipped.current = 0;
    cardIndices.current = pairShuffler(numPairs);
  }, []);

  const cardArray: ReactElement[] = [];
  for (let i = 0; i < cardIndices.current.length; ++i) {
    cardArray.push(
      <Card
        key={i}
        index={i}
        imageIndex={cardIndices.current[i]}
        flipped={flipped[i]}
        handleCardClick={handleCardClick}
      />
    );
  }

  return (
    <div className={styles.tableau}>
      <div className={styles.cardContainer}>{cardArray}</div>
    </div>
  );
}
