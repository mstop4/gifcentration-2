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
import { Rating } from '@giphy/js-fetch-api';

export type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tableauSize: number;
  setTableauSize: Dispatch<SetStateAction<number>>;
  rating: Rating;
  setRating: Dispatch<SetStateAction<Rating>>;
  getGifs: () => Promise<number>;
  resetImageLoaded: (numCards: number) => void;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

const minCards = 2;
const maxCards = 100;
const cardsStep = 2;

export default function SearchForm(props: SearchFormProps): ReactElement {
  const {
    searchQuery,
    setSearchQuery,
    tableauSize,
    setTableauSize,
    rating,
    setRating,
    getGifs,
    resetImageLoaded,
    resetCards,
    setGameState,
  } = props;

  const _postGifSearchSetup = (numCards: number): void => {
    resetCards(numCards);
    resetImageLoaded(numCards);
    setSearchQuery(() => '');
  };

  // Event handlers
  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchQuery(() => e.target.value);
  };

  const handleQueryClear: MouseEventHandler<HTMLButtonElement> = () => {
    setSearchQuery(() => '');
  };

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newRating = e.target.value as Rating;
    setRating(() => newRating);
  };

  const handleNumCardsChange: ChangeEventHandler<HTMLInputElement> = e => {
    setTableauSize(() => parseInt(e.target.value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    setGameState(() => GameState.Searching);
    console.log(
      `Go! Search for: ${searchQuery}\nExpected Tableau Size: ${tableauSize}\nRating: ${rating}`
    );
    const numResults = await getGifs();
    setGameState(() => GameState.Loading);

    if (numResults === tableauSize / 2) {
      // There are enough GIFs for every card in the tableau
      _postGifSearchSetup(tableauSize);
    } else if (numResults < tableauSize / 2) {
      // There aren't enough GIFs for every card in the tableau, reduce tableau size
      _postGifSearchSetup(numResults * 2);
    }
  };

  return (
    <form id={styles.searchForm} onSubmit={handleSubmit}>
      <label className={styles.searchMajorLabel} htmlFor="searchQuery">
        Search for GIFs
      </label>
      <div>
        <input
          type="text"
          id="searchQuery"
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
      <label className={styles.searchMajorLabel}>Rating</label>
      <div>
        <input
          type="radio"
          id="ratingY"
          className={styles.searchFilterButton}
          name="rating"
          value="y"
          checked={rating === 'y'}
          onChange={handleRatingChange}
        />
        <label htmlFor="ratingY" className={styles.searchRatingLabel}>
          Y
        </label>

        <input
          type="radio"
          id="ratingG"
          className={styles.searchFilterButton}
          name="rating"
          value="g"
          checked={rating === 'g'}
          onChange={handleRatingChange}
        />
        <label htmlFor="ratingG" className={styles.searchRatingLabel}>
          G
        </label>

        <input
          type="radio"
          id="ratingPG"
          className={styles.searchFilterButton}
          name="rating"
          value="pg"
          checked={rating === 'pg'}
          onChange={handleRatingChange}
        />
        <label htmlFor="ratingPG" className={styles.searchRatingLabel}>
          PG
        </label>

        <input
          type="radio"
          id="ratingPG13"
          className={styles.searchFilterButton}
          name="rating"
          value="pg-13"
          checked={rating === 'pg-13'}
          onChange={handleRatingChange}
        />
        <label htmlFor="ratingPG13" className={styles.searchRatingLabel}>
          PG-13
        </label>

        <input
          type="radio"
          id="ratingR"
          className={styles.searchFilterButton}
          name="rating"
          value="r"
          checked={rating === 'r'}
          onChange={handleRatingChange}
        />
        <label htmlFor="ratingR" className={styles.searchRatingLabel}>
          R
        </label>
      </div>
      <div>
        <label htmlFor="searchNumCards" className={styles.searchMajorLabel}>
          Tableau Size
        </label>
        <input
          type="number"
          id="searchNumCards"
          className={styles.searchFieldInput}
          name="tableauSize"
          value={tableauSize}
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
