import { Architects_Daughter } from 'next/font/google';
import { useTitleVisibleStore } from '../game/Game.stores';
import SearchGifsButton from '../elements/ui/SearchGifsButton';
import ResetGameButton from '../elements/ui/ResetGameButton';
import type { ReactElement } from 'react';
import { GameState } from '../game/Game.typedefs';
import styles from '@/styles/layout/Header.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type HeaderProps = {
  gameState: GameState;
  resetCards: () => void;
  showSearchOverlay: () => void;
};

const titleFont = Architects_Daughter({ subsets: ['latin'], weight: '400' });

export default function Header(props: HeaderProps): ReactElement {
  const headerVisible = useTitleVisibleStore(state => state.headerVisible);

  const titleClasses = `${titleFont.className} ${
    headerVisible ? genericStyles.elementVisible : genericStyles.elementHidden
  }`;

  return (
    <header id={styles.header}>
      <span id={styles.headerTitle} className={titleClasses}>
        GIFcentration 2
      </span>
      <span id={styles.headerButtons}>
        <SearchGifsButton
          gameState={props.gameState}
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
