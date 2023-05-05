import { useCallback, useEffect } from 'react';
import Card from './Card';
import { SortedGifData } from '../../../helpers/gif';
import type { ReactElement, Dispatch, SetStateAction } from 'react';
import { GameState } from '../../game/Game.typedefs';
import clientConfig from '../../../config/clientConfig';
import styles from '@/styles/elements/game/Tableau.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type TableauProps = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  reduceMotions: boolean;
  flipped: boolean[];
  setFlipped: Dispatch<SetStateAction<boolean[]>>;
  matched: boolean[];
  setMatched: Dispatch<SetStateAction<boolean[]>>;
  imageIndexes: number[];
  imageData: SortedGifData[];
  updateImageLoaded: (index: number) => void;
  selectedCardIndexes: number[];
  setSelectedCardIndexes: Dispatch<SetStateAction<number[]>>;
  showConfetti: () => void;
};

const { checkDelay } = clientConfig.tableau;

export default function Tableau(props: TableauProps): ReactElement {
  const {
    gameState,
    setGameState,
    reduceMotions,
    flipped,
    setFlipped,
    matched,
    setMatched,
    imageIndexes,
    imageData,
    updateImageLoaded,
    selectedCardIndexes,
    setSelectedCardIndexes,
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

  // Checks if flipped cards match
  const checkPair = useCallback((): void => {
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
    setSelectedCardIndexes([]);
  }, [
    imageIndexes,
    selectedCardIndexes,
    matched,
    setFlipped,
    setMatched,
    setSelectedCardIndexes,
  ]);

  useEffect(() => {
    if (selectedCardIndexes.length >= 2) {
      setTimeout(checkPair, checkDelay);
    }
  }, [selectedCardIndexes, checkPair]);

  const handleCardClick = (index: number): void => {
    if (gameState !== GameState.Playing) return;
    if (flipped[index]) return;
    if (selectedCardIndexes.length >= 2) return;

    // Mark current card as flipped
    setFlipped(prev => prev.map((value, i) => (i === index ? true : value)));
    setSelectedCardIndexes(prev => [...prev, index]);
  };

  const cardArray: ReactElement[] = [];
  for (let i = 0; i < imageIndexes.length; ++i) {
    cardArray.push(
      <Card
        key={i}
        index={i}
        reduceMotions={reduceMotions}
        imageData={imageData[imageIndexes[i]]}
        flipped={flipped[i]}
        matched={matched[i]}
        handleCardClick={handleCardClick}
        updateImageLoaded={updateImageLoaded}
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
          ? genericStyles.elementHidden
          : genericStyles.elementVisible
      }
    >
      {cardArray}
    </div>
  );
}
