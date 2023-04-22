import React, { Dispatch, ReactElement } from 'react';
import { ElementVisibilityAction, GameState } from './Game';
import SearchGifsButton from '../elements/ui/SearchGifsButton';
import ResetGameButton from '../elements/ui/ResetGameButton';
import styles from '@/styles/layout/Header.module.scss';

export type HeaderProps = {
  gameState: GameState;
  resetCards: () => void;
  dispatchVisible: Dispatch<ElementVisibilityAction>;
  showSearchOverlay: () => void;
};

export default function Footer(props: HeaderProps): ReactElement {
  return (
    <header id={styles.header}>
      <span id={styles.headerTitle}>GIFcentration 2</span>
      <span id={styles.headerButtons}>
        <SearchGifsButton
          gameState={props.gameState}
          dispatchVisible={props.dispatchVisible}
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
