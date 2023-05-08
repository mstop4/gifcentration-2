import type { ReactElement } from 'react';
import {
  useClickHereVisibleStore,
  useTitleVisibleStore,
} from '../../../stores/stores';
import styles from '@/styles/elements/ui/ClickHere.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type ClickHereProps = {
  showSearchOverlay: () => void;
};

export default function ClickHere(props: ClickHereProps): ReactElement {
  const titleRendered = useTitleVisibleStore(state => state.titleRendered);
  const headerVisible = useTitleVisibleStore(state => state.headerVisible);
  const setTitleVisibility = useTitleVisibleStore.setState;
  const visible = useClickHereVisibleStore(state => state.visible);
  const setClickHereVisibility = useClickHereVisibleStore.setState;

  const { showSearchOverlay } = props;

  const handleClick = () => {
    setClickHereVisibility({ visible: false });

    if (titleRendered) {
      setTitleVisibility({ titleVisible: false });

      setTimeout(() => {
        setTitleVisibility({ subtitleVisible: false });
      }, 250);
      setTimeout(() => {
        showSearchOverlay();
      }, 500);
      setTimeout(() => {
        setClickHereVisibility({ rendered: false });
      }, 1000);
      setTimeout(() => {
        setTitleVisibility({ titleRendered: false });
      }, 1250);
    } else {
      showSearchOverlay();
    }

    if (!headerVisible) {
      setTimeout(() => {
        setTitleVisibility({ headerVisible: true });
      }, 1000);
    }
  };

  const className = visible
    ? genericStyles.elementVisible
    : genericStyles.elementHidden;

  return (
    <div id={styles.clickHere} className={className} onClick={handleClick}>
      Click here to start!
    </div>
  );
}
