import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/elements/SearchForm.module.scss';
import { GameState, GifErrorState } from '../layout/Game';
import { Rating } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';

export type SearchFormProps = {
  tableauSize: number;
  setTableauSize: Dispatch<SetStateAction<number>>;
  updateImageData: (data: IGif[]) => void;
  resetImageLoaded: (numCards: number) => void;
  resetCards: (numCards: number) => void;
  setGameState: Dispatch<SetStateAction<GameState>>;
  setGifErrorState: Dispatch<SetStateAction<GifErrorState>>;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  stopConfetti: () => void;
};

const minCards = 2;
const maxCards = 100;
const cardsStep = 2;

export default function SearchForm(props: SearchFormProps): ReactElement {
  const {
    tableauSize,
    setTableauSize,
    updateImageData,
    resetImageLoaded,
    resetCards,
    setGameState,
    setGifErrorState,
    setAlertVisible,
    stopConfetti,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState<Rating>('g');

  const alertTimeout = useRef<NodeJS.Timeout | null>(null);

  // Gets GIFs from API service
  const getGifs = async (): Promise<number> => {
    console.log(`Getting ${tableauSize / 2} pairs...`);

    const searchParams = new URLSearchParams({
      q: searchQuery,
      limit: (tableauSize / 2).toString(),
      rating,
    });

    const response = await fetch('/api/search?' + searchParams);
    const json = await response.json();
    updateImageData(json);

    return json.length;
  };

  // Sets up game after receiving gif data
  const postGifSearchSetup = (numCards: number): void => {
    resetCards(numCards);
    resetImageLoaded(numCards);
    setSearchQuery('');
  };

  // Shows alert with a given state
  const showAlert = (state: GifErrorState): void => {
    setGifErrorState(state);
    setAlertVisible(true);

    if (alertTimeout.current != null) {
      clearTimeout(alertTimeout.current);
    }

    alertTimeout.current = setTimeout(() => {
      setAlertVisible(false);
    }, 5000);
  };

  // Hides alert
  const hideAlert = (): void => {
    if (alertTimeout.current != null) {
      clearTimeout(alertTimeout.current);
    }
    setAlertVisible(false);
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
    setTableauSize(parseInt(e.target.value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    hideAlert();
    stopConfetti();
    setGameState(GameState.Searching);
    const numResults = await getGifs();
    setGameState(GameState.Loading);

    if (numResults === 0) {
      // No GIFs found
      setGameState(GameState.Idle);
      showAlert(GifErrorState.NoGifs);
    } else if (numResults === tableauSize / 2) {
      // There are enough GIFs for every card in the tableau
      postGifSearchSetup(tableauSize);
      setGifErrorState(GifErrorState.Ok);
    } else if (numResults < tableauSize / 2) {
      // There aren't enough GIFs for every card in the tableau, reduce tableau size
      postGifSearchSetup(numResults * 2);
      showAlert(GifErrorState.NotEnoughGifs);
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
