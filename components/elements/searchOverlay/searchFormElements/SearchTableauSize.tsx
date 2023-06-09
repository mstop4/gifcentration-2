import { useGameStore } from '../../../../stores/stores';
import clientConfig from '../../../../config/clientConfig';
import type { ChangeEventHandler } from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

const { minCards, maxCards, cardsStep } = clientConfig.searchForm;

export default function SearchTableauSize() {
  const idealTableauSize = useGameStore(state => state.idealTableauSize);
  const setIdealTableauSize = useGameStore(state => state.setIdealTableauSize);

  const handleNumCardsChange: ChangeEventHandler<HTMLInputElement> = e => {
    setIdealTableauSize(e.target.value);
  };

  return (
    <>
      <label htmlFor="numCards" className={styles.L2Label}>
        Tableau Size
      </label>
      <input
        type="number"
        id={styles.numCards}
        className={styles.fieldInput}
        name="tableauSize"
        value={idealTableauSize}
        onChange={handleNumCardsChange}
        min={minCards}
        max={maxCards}
        step={cardsStep}
        required
      ></input>
    </>
  );
}
