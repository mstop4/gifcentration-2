import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { GameState } from './Game';
import SearchGifsButton from '../elements/ui/SearchGifsButton';
import ResetGameButton from '../elements/ui/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';

export type HeaderProps = {
  gameState: GameState;
  resetCards: () => void;
  setClickHereVisible: Dispatch<SetStateAction<boolean>>;
  showSearchOverlay: () => void;
};

export default function Footer(props: HeaderProps): ReactElement {
  return (
    <header id={styles.header}>
      <span id={styles.headerTitle}>GIFcentration 2</span>
      <span id={styles.headerButtons}>
        <SearchGifsButton
          gameState={props.gameState}
          setClickHereVisible={props.setClickHereVisible}
          showSearchOverlay={props.showSearchOverlay}
        />
        <ResetGameButton
          gameState={props.gameState}
          resetCards={props.resetCards}
        />
      </span>
    </header>
  );
}
