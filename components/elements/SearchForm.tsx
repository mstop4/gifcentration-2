import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
} from 'react';
import styles from '@/styles/elements/SearchForm.module.scss';

export type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  getGifs: () => Promise<void>;
  hideSearchOverlay: () => void;
};

export default function SearchForm(props: SearchFormProps): ReactElement {
  const { searchQuery, setSearchQuery, getGifs, hideSearchOverlay } = props;

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchQuery(() => e.target.value);
  };

  const handleQueryClear: MouseEventHandler<HTMLButtonElement> = () => {
    setSearchQuery(() => '');
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    console.log(`Go: ${searchQuery}`);
    await getGifs();
    setSearchQuery(() => '');
    hideSearchOverlay();
  };

  return (
    <form id={styles.searchForm} onSubmit={handleSubmit}>
      <label htmlFor={styles.searchQuery}>Search for GIFs</label>
      <input
        type="text"
        id={styles.searchQuery}
        name="searchQuery"
        placeholder="Enter your query here..."
        value={searchQuery}
        onChange={handleQueryChange}
        required
      />
      <div>
        <button id={styles.searchSubmit} type="submit">
          Go!
        </button>
        <button
          id={styles.searchClear}
          type="button"
          disabled={searchQuery.length === 0}
          onClick={handleQueryClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
