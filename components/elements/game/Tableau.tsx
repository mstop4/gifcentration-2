import { useCallback, useEffect } from 'react';
import { useGameStore, useImageDataStore } from '../../../stores/stores';
import Card from './Card';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.enums';
import clientConfig from '../../../config/clientConfig';
import styles from '@/styles/elements/game/Tableau.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type TableauProps = {
  reduceMotions: boolean;
  updateImageLoaded: (index: number) => void;
  showConfetti: () => void;
};

const { checkDelay } = clientConfig.tableau;

export default function Tableau(props: TableauProps): ReactElement {
  const { reduceMotions, updateImageLoaded, showConfetti } = props;

  const gameState = useGameStore(state => state.gameState);
  const setGameState = useGameStore(state => state.setGameState);
  const flipped = useGameStore(state => state.flipped);
  const setFlipped = useGameStore(state => state.setFlipped);
  const matched = useGameStore(state => state.matched);
  const setMatched = useGameStore(state => state.setMatched);
  const selectedCardIndexes = useGameStore(state => state.selectedCardIndexes);
  const setSelectedCardIndexes = useGameStore(
    state => state.setSelectedCardIndexes
  );
  const imageData = useImageDataStore(state => state.imageData);
  const imageIndexes = useImageDataStore(state => state.imageIndexes);

  // Checks if flipped cards match
  const checkPair = useCallback(() => {
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

  const handleCardClick = (index: number) => {
    if (gameState !== GameState.Playing) return;
    if (flipped[index]) return;
    if (selectedCardIndexes.length >= 2) return;

    // Mark current card as flipped
    setFlipped({ type: 'set', payload: index });
    setSelectedCardIndexes({ type: 'push', payload: index });
  };

  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    // If all cards have been matched, end game
    if (matched.every(status => status)) {
      setGameState(GameState.Finished);
      showConfetti();
    }
  }, [gameState, matched, setGameState, showConfetti]);

  useEffect(() => {
    if (selectedCardIndexes.length >= 2) {
      setTimeout(checkPair, checkDelay);
    }
  }, [selectedCardIndexes, checkPair]);

  const cardArray: ReactElement[] = [];
  if (imageData.length > 0 && imageIndexes.length > 0) {
    for (let i = 0; i < imageIndexes.length; ++i) {
      cardArray.push(
        <Card
          key={`${imageData[imageIndexes[i]].id}-${i}`}
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
