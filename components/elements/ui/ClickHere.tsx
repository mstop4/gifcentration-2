import React, { Dispatch, ReactElement } from 'react';
import styles from '@/styles/elements/ui/ClickHere.module.scss';
import { ElementVisibilityAction } from '../../layout/Game';

export type ClickHereProps = {
  visible: boolean;
  dispatchVisible: Dispatch<ElementVisibilityAction>;
  showSearchOverlay: () => void;
};

export default function ClickHere(props: ClickHereProps): ReactElement {
  const { visible, dispatchVisible, showSearchOverlay } = props;

  const handleClick = (): void => {
    showSearchOverlay();
    dispatchVisible({ prop: 'visible', value: false });
  };

  const handleTransitionEnd = (): void => {
    dispatchVisible({ prop: 'rendered', value: false });
  };

  return (
    <div
      id={styles.clickHere}
      className={visible ? styles.clickHereVisible : styles.clickHereHidden}
      onClick={handleClick}
      onTransitionEnd={handleTransitionEnd}
    >
      Click here to start!
    </div>
  );
}
