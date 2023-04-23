import React, { Dispatch, ReactElement } from 'react';
import {
  ElementVisibilityAction,
  GameState,
  TitleVisibility,
  TitleVisibilityAction,
} from './Game';
import SearchGifsButton from '../elements/ui/SearchGifsButton';
import ResetGameButton from '../elements/ui/ResetGameButton';
import { Architects_Daughter } from 'next/font/google';
import styles from '@/styles/layout/Header.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type HeaderProps = {
  gameState: GameState;
  resetCards: () => void;
  titleVisible: TitleVisibility;
  dispatchTitleVisible: Dispatch<TitleVisibilityAction>;
  dispatchClickHereVisible: Dispatch<ElementVisibilityAction>;
  showSearchOverlay: () => void;
};

const titleFont = Architects_Daughter({ subsets: ['latin'], weight: '400' });

export default function Header(props: HeaderProps): ReactElement {
  const titleClasses = `${titleFont.className} ${
    props.titleVisible.headerVisible
      ? genericStyles.elementVisible
      : genericStyles.elementHidden
  }`;

  return (
    <header id={styles.header}>
      <span id={styles.headerTitle} className={titleClasses}>
        GIFcentration 2
      </span>
      <span id={styles.headerButtons}>
        <SearchGifsButton
          gameState={props.gameState}
          titleVisible={props.titleVisible}
          dispatchTitleVisible={props.dispatchTitleVisible}
          dispatchClickHereVisible={props.dispatchClickHereVisible}
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
