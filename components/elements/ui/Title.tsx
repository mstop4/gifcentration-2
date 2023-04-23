import React, { ReactElement } from 'react';
import styles from '@/styles/elements/ui/Title.module.scss';
import genericStyles from '@/styles/GenericStyles.module.scss';
import { TitleVisibility } from '../../layout/Game';

export type TitleProps = {
  titleVisible: TitleVisibility;
};

export default function Title(props: TitleProps): ReactElement {
  const { titleVisible } = props;

  const mainTitleClasses = `${styles.mainTitle} ${
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
