import React, { ReactElement } from 'react';
import ResetGameButton from '../elements/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';

export type HeaderProps = {
  resetCards: () => void;
};

export default function Header(props: HeaderProps): ReactElement {
  const { resetCards } = props;

  return (
    <header id={styles.header}>
      <span>GIFcentration 2</span>
      <ResetGameButton resetCards={resetCards} />
    </header>
  );
}
