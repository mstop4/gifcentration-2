import React, { ReactElement } from 'react';
import SearchGifsButton from '../elements/SearchGifsButton';
import ResetGameButton from '../elements/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';

export type HeaderProps = {
  getGifs: () => Promise<void>;
  resetCards: () => void;
};

export default function Header(props: HeaderProps): ReactElement {
  const { getGifs, resetCards } = props;

  return (
    <header id={styles.header}>
      <span>GIFcentration 2</span>
      <span>
        <SearchGifsButton getGifs={getGifs} resetCards={resetCards} />
        <ResetGameButton resetCards={resetCards} />
      </span>
    </header>
  );
}
