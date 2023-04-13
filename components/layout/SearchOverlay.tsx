import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from '@/styles/layout/SearchOverlay.module.scss';
import OverlayCloseButton from '../elements/OverlayCloseButton';
import SearchForm from '../elements/SearchForm';

export type SearchOverlayProps = {
  overlayVisible: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  hideSearchOverlay: () => void;
};

export default function SearchOverlay(props: SearchOverlayProps): ReactElement {
  const { overlayVisible, searchQuery, setSearchQuery, hideSearchOverlay } =
    props;
  const classes = `${styles.overlayBase} ${
    overlayVisible ? styles.overlayOpen : ''
  }`;

  return (
    <div id={styles.searchOverlay} className={classes}>
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <OverlayCloseButton hideOverlay={hideSearchOverlay} />
    </div>
  );
}
