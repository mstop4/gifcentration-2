import React, { ReactElement, useState } from 'react';
import Card from './Card';
import { useMountEffect } from '@react-hookz/web';
import getRectangleDimensions, {
  RectangleDimensions,
} from '../../helpers/getRectangleDimensions';
import styles from '@/styles/elements/Tableau.module.scss';

export type TableauProps = {
  flipped: boolean[];
  setFlipped: React.Dispatch<React.SetStateAction<boolean[]>>;
  matched: boolean[];
  setMatched: React.Dispatch<React.SetStateAction<boolean[]>>;
  numCards: number;
  imageIndexes: number[];
  selectedCardIndexes: number[];
  addSelectedCardIndex: (index: number) => void;
  resetSelectedCardIndexes: () => void;
};

const checkDelay = 1000;

export default function Tableau(props: TableauProps): ReactElement {
  const [gameFinished, setGameFinished] = useState(false);

  const {
    flipped,
    setFlipped,
    matched,
    setMatched,
    numCards,
    imageIndexes,
    selectedCardIndexes,
    addSelectedCardIndex,
    resetSelectedCardIndexes,
  } = props;

  useMountEffect(() => {
    const rect = getRectangleDimensions(numCards);
    if (rect.majorAxisSize === 0 || rect.minorAxisSize === 0) return;
    updateGridDimensions(rect);
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
      imageIndexes[selectedCardIndexes[0]] ===
      imageIndexes[selectedCardIndexes[1]]
    ) {
      const newMatched = [...matched];
      newMatched[selectedCardIndexes[0]] = true;
      newMatched[selectedCardIndexes[1]] = true;
      setMatched(() => newMatched);

      if (newMatched.every(status => status)) {
        setGameFinished(() => true);
      }
    } else {
      setFlipped(() => [...matched]);
    }
    resetSelectedCardIndexes();
  };

  const handleCardClick = (index: number): void => {
    if (flipped[index]) return;
    if (selectedCardIndexes.length >= 2) return;

    const newFlipped = { ...flipped };
    newFlipped[index] = true;
    setFlipped(() => newFlipped);
    addSelectedCardIndex(index);

    if (selectedCardIndexes.length >= 2) {
      setTimeout(checkPair, checkDelay);
    }
  };

  const cardArray: ReactElement[] = [];
  for (let i = 0; i < imageIndexes.length; ++i) {
    cardArray.push(
      <Card
        key={i}
        index={i}
        imageIndex={imageIndexes[i]}
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
