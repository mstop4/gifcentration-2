import type { ReactElement } from 'react';
import {
  useClickHereVisibleStore,
  useTitleVisibleStore,
} from '../../game/Game.stores';
import styles from '@/styles/elements/ui/ClickHere.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type ClickHereProps = {
  showSearchOverlay: () => void;
};

export default function ClickHere(props: ClickHereProps): ReactElement {
  const titleRendered = useTitleVisibleStore(state => state.titleRendered);
  const headerVisible = useTitleVisibleStore(state => state.headerVisible);
  const visible = useClickHereVisibleStore(state => state.visible);
  const setTitleVisibility = useTitleVisibleStore(state => state.setVisibilty);
  const setClickHereVisibility = useClickHereVisibleStore(
    state => state.setVisibilty
  );

  const { showSearchOverlay } = props;

  const handleClick = (): void => {
    setClickHereVisibility({ prop: 'visible', value: false });

    if (titleRendered) {
      setTitleVisibility({ prop: 'titleVisible', value: false });

      setTimeout(() => {
        setTitleVisibility({ prop: 'subtitleVisible', value: false });
      }, 250);
      setTimeout(() => {
        showSearchOverlay();
      }, 500);
      setTimeout(() => {
        setClickHereVisibility({ prop: 'rendered', value: false });
      }, 1000);
      setTimeout(() => {
        setTitleVisibility({ prop: 'titleRendered', value: false });
      }, 1250);
    } else {
      showSearchOverlay();
    }

    if (!headerVisible) {
      setTimeout(() => {
        setTitleVisibility({ prop: 'headerVisible', value: true });
      }, 1000);
    }
  };

  return (
    <div
      id={styles.clickHere}
      className={
        visible ? genericStyles.elementVisible : genericStyles.elementHidden
      }
      onClick={handleClick}
    >
      Click here to start!
    </div>
  );
}
