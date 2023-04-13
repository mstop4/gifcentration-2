import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/elements/SearchForm.module.scss';
import { GameState } from '../layout/Game';

export type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  numCards: number;
  setNumCards: Dispatch<SetStateAction<number>>;
  getGifs: () => Promise<void>;
  resetCards: () => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  hideSearchOverlay: () => void;
};

const minCards = 2;
const maxCards = 100;
const cardsStep = 2;

export default function SearchForm(props: SearchFormProps): ReactElement {
  const {
    searchQuery,
    setSearchQuery,
    numCards,
    setNumCards,
    getGifs,
    resetCards,
    setGameState,
    hideSearchOverlay,
  } = props;

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchQuery(() => e.target.value);
  };

  const handleQueryClear: MouseEventHandler<HTMLButtonElement> = () => {
    setSearchQuery(() => '');
  };

  const handleNumCardsChange: ChangeEventHandler<HTMLInputElement> = e => {
    setNumCards(() => parseInt(e.target.value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    setGameState(() => GameState.Loading);
    console.log(`Go! Search for: ${searchQuery} Num Cards: ${numCards}`);
    hideSearchOverlay();
    await getGifs();
    resetCards();
    setSearchQuery(() => '');

    setTimeout(() => {
      setGameState(() => GameState.Playing);
    }, 1000);
  };

  return (
    <form id={styles.searchForm} onSubmit={handleSubmit}>
      <label htmlFor="searchQuery">Search for GIFs</label>
      <div>
        <input
          type="text"
          id=""
          className={styles.searchFieldInput}
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
      <div>
        <label htmlFor="searchNumCards">Tableau Size</label>
        <input
          type="number"
          id="searchNumCards"
          className={styles.searchFieldInput}
          name="numCards"
          value={numCards}
          onChange={handleNumCardsChange}
          min={minCards}
          max={maxCards}
          step={cardsStep}
          required
        ></input>
      </div>
      <button id={styles.searchSubmit} type="submit">
        Go!
      </button>
    </form>
  );
}
