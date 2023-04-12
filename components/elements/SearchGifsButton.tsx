import React, { ReactElement } from 'react';
import styles from '@/styles/elements/SearchGifsButton.module.scss';

export type SearchGifsButtonProps = {
  getGifs: () => Promise<void>;
  resetCards: () => void;
};

export default function SearchGifsButton(
  props: SearchGifsButtonProps
): ReactElement {
  const { getGifs, resetCards } = props;

  const handleClick = async (): Promise<void> => {
    await getGifs();
    resetCards();
  };

  return (
    <button id={styles.searchGifsButton} onClick={handleClick}>
      Search
    </button>
  );
}
