import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styles from '@/styles/elements/ui/ClickHere.module.scss';

export type ClickHereProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  showSearchOverlay: () => void;
};

export default function ClickHere(props: ClickHereProps): ReactElement {
  const { setVisible, showSearchOverlay } = props;

  const handleClick = (): void => {
    setVisible(false);
    showSearchOverlay();
  };

  return (
    <div id={styles.clickHere} onClick={handleClick}>
      Click here to start!
    </div>
  );
}
