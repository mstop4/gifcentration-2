import React, { ReactElement, useCallback, useRef, useState } from 'react';
import Card from './Card';
import styles from '@/styles/elements/Tableau.module.scss';
import pairShuffler from '../../helpers/pairShuffler';
import { useMountEffect } from '@react-hookz/web';
import getRectangleDimensions, {
  RectangleDimensions,
} from '../../helpers/getRectangleDimensions';

const numCards = 16;
const checkDelay = 1000;

export default function Tableau(): ReactElement {
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const numFlipped = useRef(0);
  const numPairs = useRef(1);
  const cardIndices = useRef<number[]>([]); // use memo?

  useMountEffect(() => {
    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);
    resetCards();
  });

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

  const checkPair = (): void => {
    setFlipped([...matched]);
    numFlipped.current = 0;
  };

  const resetCards = useCallback(() => {
    numPairs.current = numCards / 2;
    setFlipped(() => Array(numCards).fill(false));
    setMatched(() => Array(numCards).fill(false));
    numFlipped.current = 0;
    cardIndices.current = pairShuffler(numPairs.current);
  }, []);

  const handleCardClick = (index: number): void => {
    if (flipped[index]) return;
    if (numFlipped.current >= 2) return;

    const newFlipped = { ...flipped };
    newFlipped[index] = true;
    setFlipped(() => newFlipped);
    numFlipped.current++;

    if (numFlipped.current >= 2) {
      setTimeout(checkPair, checkDelay);
    }
  };

  const cardArray: ReactElement[] = [];
  for (let i = 0; i < cardIndices.current.length; ++i) {
    cardArray.push(
      <Card
        key={i}
        index={i}
        imageIndex={cardIndices.current[i]}
        flipped={flipped[i]}
        active={true}
        matched={false}
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
