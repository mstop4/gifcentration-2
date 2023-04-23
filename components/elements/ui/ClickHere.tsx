import React, { Dispatch, ReactElement } from 'react';
import styles from '@/styles/elements/ui/ClickHere.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';
import {
  ElementVisibilityAction,
  TitleVisibility,
  TitleVisibilityAction,
} from '../../layout/Game';

export type ClickHereProps = {
  visible: boolean;
  titleVisible: TitleVisibility;
  dispatchTitleVisible: Dispatch<TitleVisibilityAction>;
  dispatchClickHereVisible: Dispatch<ElementVisibilityAction>;
  showSearchOverlay: () => void;
};

export default function ClickHere(props: ClickHereProps): ReactElement {
  const {
    visible,
    titleVisible,
    dispatchTitleVisible,
    dispatchClickHereVisible,
    showSearchOverlay,
  } = props;

  const handleClick = (): void => {
    dispatchClickHereVisible({ prop: 'visible', value: false });

    if (titleVisible.titleRendered) {
      dispatchTitleVisible({ type: 'hideTitle' });

      setTimeout(() => {
        dispatchTitleVisible({ type: 'hideSubtitle' });
      }, 250);
      setTimeout(() => {
        showSearchOverlay();
      }, 500);
      setTimeout(() => {
        dispatchClickHereVisible({ prop: 'rendered', value: false });
      }, 1000);
      setTimeout(() => {
        dispatchTitleVisible({ type: 'removeTitle' });
      }, 1250);
    } else {
      showSearchOverlay();
    }

    if (!titleVisible.headerVisible) {
      setTimeout(() => {
        dispatchTitleVisible({ type: 'showHeader' });
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
