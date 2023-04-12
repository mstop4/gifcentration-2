import React, { ReactElement } from 'react';
import styles from '@/styles/layout/SearchOverlay.module.scss';
import OverlayCloseButton from '../elements/OverlayCloseButton';

export type SearchOverlayProps = {
  overlayVisible: boolean;
  hideSearchOverlay: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const { overlayVisible, hideSearchOverlay } = props;
  const classes = `${styles.overlayBase} ${
    overlayVisible ? styles.overlayOpen : ''
  }`;

  return (
    <div id={styles.searchOverlay} className={classes}>
      <p>Search GIFs</p>
      <OverlayCloseButton hideOverlay={hideSearchOverlay} />
    </div>
  );
}
