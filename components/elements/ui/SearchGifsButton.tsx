import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  useClickHereVisibleStore,
  useTitleVisibleStore,
} from '../../game/Game.stores';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.typedefs';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';

export type SearchGifsButtonProps = {
  gameState: GameState;
  showSearchOverlay: () => void;
};

export default function SearchGifsButton(
  props: SearchGifsButtonProps
): ReactElement {
  const { gameState, showSearchOverlay } = props;

  const titleRendered = useTitleVisibleStore(state => state.titleRendered);
  const headerVisible = useTitleVisibleStore(state => state.headerVisible);
  const setTitleVisibility = useTitleVisibleStore(state => state.setVisibilty);
  const setClickHereVisibility = useClickHereVisibleStore(
    state => state.setVisibilty
  );

  const handleClick = async (): Promise<void> => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;

    showSearchOverlay();
    setClickHereVisibility({ prop: 'visible', value: false });

    if (titleRendered) {
      setTitleVisibility({ prop: 'titleVisible', value: false });

      setTimeout(() => {
        setTitleVisibility({ prop: 'subtitleVisible', value: false });
      }, 250);
      setTimeout(() => {
        setClickHereVisibility({ prop: 'rendered', value: false });
      }, 1000);
      setTimeout(() => {
        setTitleVisibility({ prop: 'titleRendered', value: false });
      }, 1250);
    }

    if (!headerVisible) {
      setTimeout(() => {
        setTitleVisibility({ prop: 'headerVisible', value: true });
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
