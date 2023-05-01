import { Rating } from '@giphy/js-fetch-api';
import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export type SearchRatingProps = {
  rating: Rating;
  setRating: Dispatch<SetStateAction<Rating>>;
};

export default function SearchRating(props: SearchRatingProps) {
  const { rating, setRating } = props;

  const handleRatingChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const newRating = e.target.value as Rating;
    setRating(() => newRating);
  };

  return (
    <>
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
    </>
  );
}
