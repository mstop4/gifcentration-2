import React, { ReactElement } from 'react';
import styles from '@/styles/elements/ResetGameButton.module.scss';

export type ResetGameButtonProps = {
  resetCards: () => void;
};

export default function ResetGameButton(
  props: ResetGameButtonProps
): ReactElement {
  const { resetCards } = props;

  const handleClick = (): void => {
    resetCards();
  };

  return (
    <button id={styles.resetGameButton} onClick={handleClick}>
      Reshuffle
    </button>
  );
}
