import clientConfig from '../../../../config/clientConfig';
import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export type SearchTableauSizeProps = {
  tableauSize: string;
  setTableauSize: Dispatch<SetStateAction<string>>;
};

const { minCards, maxCards, cardsStep } = clientConfig.searchForm;

export default function SearchTableauSize(props: SearchTableauSizeProps) {
  const { tableauSize, setTableauSize } = props;

  const handleNumCardsChange: ChangeEventHandler<HTMLInputElement> = e => {
    setTableauSize(e.target.value);
  };

  return (
    <>
      <label htmlFor="searchNumCards" className={styles.searchL2Label}>
        Tableau Size
      </label>
      <input
        type="number"
        id={styles.searchNumCards}
        className={styles.searchFieldInput}
        name="tableauSize"
        value={tableauSize}
        onChange={handleNumCardsChange}
        min={minCards}
        max={maxCards}
        step={cardsStep}
        required
      ></input>
    </>
  );
}
