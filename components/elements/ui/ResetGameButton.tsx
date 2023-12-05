import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useGameStore } from '../../../stores/stores';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.enums';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';
import styles from '@/styles/elements/ui/ResetGameButton.module.scss';

export type ResetGameButtonProps = {
  resetCards: (numCards?: number) => void;
};

export default function ResetGameButton(
  props: ResetGameButtonProps,
): ReactElement {
  const { resetCards } = props;

  const gameState = useGameStore(state => state.gameState);

  const handleClick = () => {
    if (
      gameState === GameState.Idle ||
      gameState === GameState.Searching ||
      gameState === GameState.Loading
    )
      return;
    resetCards();
  };

  return (
    <button
      id={styles.resetGameButton}
      className={buttonBaseStyles.buttonBase}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faRotateLeft} data-testid="reset" />
    </button>
  );
}
