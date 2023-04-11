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

  const imageIndexes = useRef<number[]>([]); // use memo?
  const selectedCardIndexes = useRef<number[]>([]);

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
    if (
      imageIndexes.current[selectedCardIndexes.current[0]] ===
      imageIndexes.current[selectedCardIndexes.current[1]]
    ) {
      const newMatched = [...matched];
      newMatched[selectedCardIndexes.current[0]] = true;
      newMatched[selectedCardIndexes.current[1]] = true;
      setMatched(() => newMatched);

      if (newMatched.every(status => status)) {
        setGameFinished(() => true);
      }
    } else {
      setFlipped(() => [...matched]);
    }
    selectedCardIndexes.current = [];
  };

  const resetCards = useCallback(() => {
    setFlipped(() => Array(numCards).fill(false));
    setMatched(() => Array(numCards).fill(false));
    selectedCardIndexes.current = [];
    imageIndexes.current = pairShuffler(numCards / 2);
  }, []);

  const handleCardClick = (index: number): void => {
    if (flipped[index]) return;
    if (selectedCardIndexes.current.length >= 2) return;

    const newFlipped = { ...flipped };
    newFlipped[index] = true;
    setFlipped(() => newFlipped);
    selectedCardIndexes.current.push(index);

    if (selectedCardIndexes.current.length >= 2) {
      setTimeout(checkPair, checkDelay);
    }
  };

  const cardArray: ReactElement[] = [];
  for (let i = 0; i < imageIndexes.current.length; ++i) {
    cardArray.push(
      <Card
        key={i}
        index={i}
        imageIndex={imageIndexes.current[i]}
        flipped={flipped[i]}
        active={true}
        matched={matched[i]}
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
