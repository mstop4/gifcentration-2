import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from 'react';
import Card from './Card';
import getRectangleDimensions, {
  RectangleDimensions,
} from '../../helpers/getRectangleDimensions';
import styles from '@/styles/elements/Tableau.module.scss';
import { GameState } from '../layout/Game';

export type TableauProps = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  flipped: boolean[];
  setFlipped: Dispatch<SetStateAction<boolean[]>>;
  matched: boolean[];
  setMatched: Dispatch<SetStateAction<boolean[]>>;
  imageIndexes: number[];
  imageUrls: string[];
  selectedCardIndexes: number[];
  addSelectedCardIndex: (index: number) => void;
  resetSelectedCardIndexes: () => void;
};

const checkDelay = 1000;

export default function Tableau(props: TableauProps): ReactElement {
  const {
    gameState,
    setGameState,
    flipped,
    setFlipped,
    matched,
    setMatched,
    imageIndexes,
    imageUrls,
    selectedCardIndexes,
    addSelectedCardIndex,
    resetSelectedCardIndexes,
  } = props;

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
        setGameState(() => GameState.Finished);
      }
    } else {
      setFlipped(() => [...matched]);
    }
    resetSelectedCardIndexes();
  };

  const handleCardClick = (index: number): void => {
    if (gameState !== GameState.Playing) return;
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
        imageUrl={imageUrls[imageIndexes[i]]}
        flipped={flipped[i]}
        active={true}
        matched={matched[i]}
        handleCardClick={handleCardClick}
      />
    );
  }

  return (
    <div
      id={styles.tableau}
      className={
        gameState === GameState.Started || gameState === GameState.Loading
          ? styles.tableauHidden
          : styles.tableauVisible
      }
    >
      {cardArray}
    </div>
  );
}
