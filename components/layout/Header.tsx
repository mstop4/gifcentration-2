import React, { ReactElement } from 'react';
import SearchGifsButton from '../elements/SearchGifsButton';
import ResetGameButton from '../elements/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';
import { GameState } from './Game';

export type HeaderProps = {
  gameState: GameState;
  resetCards: () => void;
  showSearchOverlay: () => void;
};

export default function Header(props: HeaderProps): ReactElement {
  const { gameState, resetCards, showSearchOverlay } = props;

  return (
    <header id={styles.header}>
      <span id={styles.headerTitle}>GIFcentration 2</span>
      {/* <span id={styles.headerQuery}>543tr4t3t43t34t43aat3434tt43t4aa34t4ag3ga434ga3 </span> */}
      <span id={styles.headerButtons}>
        <SearchGifsButton
          gameState={gameState}
          showSearchOverlay={showSearchOverlay}
        />
        <ResetGameButton gameState={gameState} resetCards={resetCards} />
      </span>
    </header>
  );
}
