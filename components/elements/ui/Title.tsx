import { Architects_Daughter } from 'next/font/google';
import type { ReactElement } from 'react';
import { TitleVisibility } from '../../game/Game.typedefs';
import styles from '@/styles/elements/ui/Title.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';

export type TitleProps = {
  titleVisible: TitleVisibility;
};

const titleFont = Architects_Daughter({ subsets: ['latin'], weight: '400' });

export default function Title(props: TitleProps): ReactElement {
  const { titleVisible } = props;

  const mainTitleClasses = `${styles.mainTitle} ${titleFont.className} ${
    titleVisible.titleVisible
      ? genericStyles.elementVisible
      : genericStyles.elementHidden
  }`;
  const subtitleClasses = `${styles.subtitle} ${
    titleVisible.subtitleVisible
      ? genericStyles.elementVisible
      : genericStyles.elementHidden
  }`;

  return (
    <div id={styles.title}>
      <h1 className={mainTitleClasses}>GIFcentration 2</h1>
      <h2 className={subtitleClasses}>Card-matching game powered by Giphy</h2>
    </div>
  );
}
