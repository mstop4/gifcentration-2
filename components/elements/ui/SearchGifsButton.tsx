import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import type { Dispatch, ReactElement } from 'react';
import {
  ElementVisibilityAction,
  GameState,
  TitleVisibility,
  TitleVisibilityAction,
} from '../../layout/Game.typedefs';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';

export type SearchGifsButtonProps = {
  gameState: GameState;
  titleVisible: TitleVisibility;
  dispatchTitleVisible: Dispatch<TitleVisibilityAction>;
  dispatchClickHereVisible: Dispatch<ElementVisibilityAction>;
  showSearchOverlay: () => void;
};

export default function SearchGifsButton(
  props: SearchGifsButtonProps
): ReactElement {
  const {
    gameState,
    titleVisible,
    dispatchTitleVisible,
    dispatchClickHereVisible,
    showSearchOverlay,
  } = props;

  const handleClick = async (): Promise<void> => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;

    showSearchOverlay();
    dispatchClickHereVisible({ prop: 'visible', value: false });

    if (titleVisible.titleRendered) {
      dispatchTitleVisible({ type: 'hideTitle' });

      setTimeout(() => {
        dispatchTitleVisible({ type: 'hideSubtitle' });
      }, 250);
      setTimeout(() => {
        dispatchClickHereVisible({ prop: 'rendered', value: false });
      }, 1000);
      setTimeout(() => {
        dispatchTitleVisible({ type: 'removeTitle' });
      }, 1250);
    }

    if (!titleVisible.headerVisible) {
      setTimeout(() => {
        dispatchTitleVisible({ type: 'showHeader' });
      }, 1000);
    }
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
