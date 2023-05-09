import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  useClickHereVisibleStore,
  useGameStore,
  useTitleVisibleStore,
} from '../../../stores/stores';
import type { ReactElement } from 'react';
import { GameState } from '../../game/Game.typedefs';
import buttonBaseStyles from '@/styles/elements/ui/ButtonBase.module.scss';
import styles from '@/styles/elements/ui/SearchGifsButton.module.scss';

export type SearchGifsButtonProps = {
  showSearchOverlay: () => void;
};

export default function SearchGifsButton(
  props: SearchGifsButtonProps
): ReactElement {
  const { showSearchOverlay } = props;

  const gameState = useGameStore(state => state.gameState);
  const titleRendered = useTitleVisibleStore(state => state.titleRendered);
  const headerVisible = useTitleVisibleStore(state => state.headerVisible);
  const setTitleVisibility = useTitleVisibleStore.setState;
  const setClickHereVisibility = useClickHereVisibleStore.setState;

  const handleClick = async () => {
    if (gameState === GameState.Searching || gameState === GameState.Loading)
      return;

    showSearchOverlay();
    setClickHereVisibility({ visible: false });

    if (titleRendered) {
      setTitleVisibility({ titleVisible: false });

      setTimeout(() => {
        setTitleVisibility({ subtitleVisible: false });
      }, 250);
      setTimeout(() => {
        setClickHereVisibility({ rendered: false });
      }, 1000);
      setTimeout(() => {
        setTitleVisibility({ titleRendered: false });
      }, 1250);
    }

    if (!headerVisible) {
      setTimeout(() => {
        setTitleVisibility({ headerVisible: true });
      }, 1000);
    }
  };

  return (
    <button
      id={styles.searchGifsButton}
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
