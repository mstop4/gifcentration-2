import React, { ReactElement } from 'react';
import SearchGifsButton from '../elements/SearchGifsButton';
import ResetGameButton from '../elements/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';

export type HeaderProps = {
  resetCards: () => void;
  showSearchOverlay: () => void;
};

export default function Header(props: HeaderProps): ReactElement {
  const { resetCards, showSearchOverlay } = props;

  return (
    <header id={styles.header}>
      <span>GIFcentration 2</span>
      <span>
        <SearchGifsButton showSearchOverlay={showSearchOverlay} />
        <ResetGameButton resetCards={resetCards} />
      </span>
    </header>
  );
}
