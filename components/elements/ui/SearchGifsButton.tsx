import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GameState } from '../../layout/Game';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';

export type SearchGifsButtonProps = {
  gameState: GameState;
  showSearchOverlay: () => void;
};

export default function SearchGifsButton(
  props: SearchGifsButtonProps
): ReactElement {
  const { gameState, showSearchOverlay } = props;

  const handleClick = async (): Promise<void> => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;
    showSearchOverlay();
  };

  return (
    <button
      id="searchGifsButton"
      className={buttonBaseStyles.buttonBase}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        data-testid="magnifying glass"
      />
    </button>
  );
}
