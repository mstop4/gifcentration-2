import { useCallback, useEffect } from 'react';
import { useGameStore } from '../../game/Game.stores';
import Card from './Card';
import { SortedGifData } from '../../../helpers/gif';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.typedefs';
import clientConfig from '../../../config/clientConfig';
import styles from '@/styles/elements/game/Tableau.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type TableauProps = {
  reduceMotions: boolean;
  imageIndexes: number[];
  imageData: SortedGifData[];
  updateImageLoaded: (index: number) => void;
  showConfetti: () => void;
};

const { checkDelay } = clientConfig.tableau;

export default function Tableau(props: TableauProps): ReactElement {
  const {
    reduceMotions,
    imageIndexes,
    imageData,
    updateImageLoaded,
    showConfetti,
  } = props;

  const {
    gameState,
    setGameState,
    flipped,
    setFlipped,
    matched,
    setMatched,
    selectedCardIndexes,
    setSelectedCardIndexes,
  } = useGameStore.getState();

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
      setMatched({ type: 'set', payload: [...selectedCardIndexes] });
    } else {
      setFlipped({ type: 'copy', payload: matched });
    }
    setSelectedCardIndexes({ type: 'clear', payload: 0 });
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
    setFlipped({ type: 'set', payload: index });
    setSelectedCardIndexes({ type: 'push', payload: index });
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
