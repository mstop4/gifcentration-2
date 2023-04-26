import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { GameState } from '../../layout/Game.typedefs';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';

export type ResetGameButtonProps = {
  gameState: GameState;
  resetCards: (numCards?: number) => void;
};

export default function ResetGameButton(
  props: ResetGameButtonProps
): ReactElement {
  const { gameState, resetCards } = props;

  const handleClick = (): void => {
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
      id="resetGameButton"
      className={buttonBaseStyles.buttonBase}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faRotateLeft} data-testid="reset" />
    </button>
  );
}
