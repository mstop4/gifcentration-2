import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from 'react';
import Card from './Card';
import styles from '@/styles/elements/Tableau.module.scss';
import { GameState } from '../layout/Game';
import { IGif } from '@giphy/js-types';

export type TableauProps = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  flipped: boolean[];
  setFlipped: Dispatch<SetStateAction<boolean[]>>;
  matched: boolean[];
  setMatched: Dispatch<SetStateAction<boolean[]>>;
  imageIndexes: number[];
  imageData: IGif[];
  updateImageLoaded: (index: number) => void;
  selectedCardIndexes: number[];
  addSelectedCardIndex: (index: number) => void;
  resetSelectedCardIndexes: () => void;
  showConfetti: () => void;
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
    imageData,
    updateImageLoaded,
    selectedCardIndexes,
    addSelectedCardIndex,
    resetSelectedCardIndexes,
    showConfetti,
  } = props;

  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    // If all cards have been matched, end game
    if (matched.every(status => status)) {
      setGameState(GameState.Finished);
      showConfetti();
    }
  }, [gameState, matched, setGameState, showConfetti]);

  const checkPair = (): void => {
    if (
      imageIndexes[selectedCardIndexes[0]] ===
      imageIndexes[selectedCardIndexes[1]]
    ) {
      setMatched(prev =>
        prev.map((value, i) =>
          i === selectedCardIndexes[0] || i === selectedCardIndexes[1]
            ? true
            : value
        )
      );
    } else {
      setFlipped([...matched]);
    }
    resetSelectedCardIndexes();
  };

  const handleCardClick = (index: number): void => {
    if (gameState !== GameState.Playing) return;
    if (flipped[index]) return;
    if (selectedCardIndexes.length >= 2) return;

    // Mark current card as flipped
    setFlipped(prev => prev.map((value, i) => (i === index ? true : value)));
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
        imageData={imageData[imageIndexes[i]]}
        flipped={flipped[i]}
        active={true}
        matched={matched[i]}
        handleCardClick={handleCardClick}
        updateImageLoaded={updateImageLoaded}
        gameState={gameState}
      />
    );
  }

  return (
    <div
      id={styles.tableau}
      className={
        gameState === GameState.Idle ||
        gameState === GameState.Searching ||
        gameState === GameState.Loading
          ? styles.tableauHidden
          : styles.tableauVisible
      }
    >
      {cardArray}
    </div>
  );
}
