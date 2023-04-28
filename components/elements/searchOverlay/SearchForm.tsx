import React, { useRef, useState } from 'react';
import type {
  ReactElement,
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import { Rating } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { SortedGifData, organizeImages } from '../../../helpers/gif';
import { GameState, GifErrorState } from '../../layout/Game.typedefs';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export enum ServerHTTPStatus {
  Ok = 200,
  BadRequest = 400,
  Forbidden = 403,
  InternalServerError = 500,
  UnknownError = -1,
}

export type GifFetchResults = {
  numResults: number;
  status: ServerHTTPStatus;
};

export type SearchFormProps = {
  tableauSize: string;
  setTableauSize: Dispatch<SetStateAction<string>>;
  updateImageData: (data: SortedGifData[]) => void;
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
  const getGifs = async (): Promise<GifFetchResults> => {
    const tableauSizeInt = parseInt(tableauSize);
    console.log(`Getting ${tableauSizeInt / 2} pairs...`);

    const searchParams = new URLSearchParams({
      q: searchQuery,
      limit: (tableauSizeInt / 2).toString(),
      rating,
    });

    const response = await fetch('/api/search?' + searchParams, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_GIFCENTRATION_API_KEY ?? '',
      },
    });
    const json = await response.json();
    const { status } = response;

    switch (status) {
      case ServerHTTPStatus.BadRequest:
      case ServerHTTPStatus.Forbidden:
      case ServerHTTPStatus.InternalServerError:
        return {
          numResults: 0,
          status,
        };

      case ServerHTTPStatus.Ok:
        // Organize image data
        const organizedData = json.map((imageData: IGif) =>
          organizeImages(imageData)
        );

        updateImageData(organizedData);
        return {
          numResults: json.length,
          status,
        };

      default:
        return {
          numResults: 0,
          status: ServerHTTPStatus.UnknownError,
        };
    }
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

  const handleRatingChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const newRating = e.target.value as Rating;
    setRating(() => newRating);
  };

  const handleNumCardsChange: ChangeEventHandler<HTMLInputElement> = e => {
    setTableauSize(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    hideAlert();
    stopConfetti();

    setGameState(GameState.Searching);
    const { numResults, status } = await getGifs();
    setGameState(GameState.Loading);
    const tableauSizeInt = parseInt(tableauSize);

    if (status !== ServerHTTPStatus.Ok) {
      // Something went wrong with the request
      setGameState(GameState.Idle);

      switch (status) {
        case ServerHTTPStatus.BadRequest:
          showAlert(GifErrorState.BadRequest);
          break;

        case ServerHTTPStatus.Forbidden:
          showAlert(GifErrorState.Forbidden);
          break;

        case ServerHTTPStatus.InternalServerError:
          showAlert(GifErrorState.InternalServerError);
          break;

        default:
          showAlert(GifErrorState.UnknownError);
      }
    } else if (numResults === 0) {
      // No GIFs found
      setGameState(GameState.Idle);
      showAlert(GifErrorState.NoGifs);
    } else if (numResults === tableauSizeInt / 2) {
      // There are enough GIFs for every card in the tableau
      postGifSearchSetup(tableauSizeInt);
      setGifErrorState(GifErrorState.Ok);
    } else if (numResults < tableauSizeInt / 2) {
      // There aren't enough GIFs for every card in the tableau, reduce tableau size
      postGifSearchSetup(numResults * 2);
      showAlert(GifErrorState.NotEnoughGifs);
    }
  };

  return (
    <form id={styles.searchForm} onSubmit={handleSubmit}>
      <label className={styles.searchL1Label} htmlFor="searchQuery">
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
      <div id={styles.searchOtherSettings}>
        <label className={styles.searchL2Label} htmlFor="searchRatingList">
          Rating
        </label>
        <select
          id={styles.searchRatingList}
          name="searchRatingList"
          value={rating}
          onChange={handleRatingChange}
        >
          <option value="y" className={styles.searchRatingOption}>
            Y
          </option>
          <option value="g" className={styles.searchRatingOption}>
            G
          </option>
          <option value="pg" className={styles.searchRatingOption}>
            PG
          </option>
          <option value="pg-13" className={styles.searchRatingOption}>
            PG-13
          </option>
          <option value="r" className={styles.searchRatingOption}>
            R
          </option>
        </select>
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
      </div>
      <button id={styles.searchSubmit} type="submit">
        Go!
      </button>
    </form>
  );
}
