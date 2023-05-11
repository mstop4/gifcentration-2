import { Architects_Daughter } from 'next/font/google';
import { useTitleVisibleStore } from '../../../stores/stores';
import type { ReactElement } from 'react';
import styles from '@/styles/elements/ui/Title.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

const titleFont = Architects_Daughter({ subsets: ['latin'], weight: '400' });

export default function Title(): ReactElement {
  const titleVisible = useTitleVisibleStore(state => state.titleVisible);
  const subtitleVisible = useTitleVisibleStore(state => state.subtitleVisible);

  const mainTitleClasses = `${styles.mainTitle} ${titleFont.className} ${
    titleVisible ? genericStyles.elementVisible : genericStyles.elementHidden
  }`;
  const subtitleClasses = `${styles.subtitle} ${
    subtitleVisible ? genericStyles.elementVisible : genericStyles.elementHidden
  }`;

  return (
    <div id={styles.title}>
      <h1 className={mainTitleClasses}>GIFcentration 2</h1>
      <h2 className={subtitleClasses}>The GIF card-matching game!</h2>
    </div>
  );
}
