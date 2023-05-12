import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import type {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export type SearchQueryProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchQuery(props: SearchQueryProps) {
  const { searchQuery, setSearchQuery } = props;

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchQuery(e.target.value);
  };

  const handleQueryClear: MouseEventHandler<HTMLButtonElement> = () => {
    setSearchQuery('');
  };

  return (
    <>
      <label className={styles.L1Label} htmlFor="searchQuery">
        Search for GIFs
      </label>
      <div className={styles.queryContainer}>
        <input
          type="text"
          id="searchQuery"
          className={styles.fieldInput}
          name="searchQuery"
          placeholder="Enter your query here..."
          value={searchQuery}
          onChange={handleQueryChange}
          required
        />
        <button
          id={styles.searchClear}
          type="button"
          disabled={searchQuery.length === 0}
          onClick={handleQueryClear}
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
      </div>
    </>
  );
}
