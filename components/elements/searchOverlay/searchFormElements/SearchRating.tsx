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
    setRating(newRating);
  };

  return (
    <>
      <label className={styles.L2Label} htmlFor="ratingList">
        Rating
      </label>
      <select
        id={styles.ratingList}
        name="ratingList"
        value={rating}
        onChange={handleRatingChange}
      >
        <option value="y" className={styles.ratingOption}>
          Y
        </option>
        <option value="g" className={styles.ratingOption}>
          G
        </option>
        <option value="pg" className={styles.ratingOption}>
          PG
        </option>
        <option value="pg-13" className={styles.ratingOption}>
          PG-13
        </option>
        <option value="r" className={styles.ratingOption}>
          R
        </option>
      </select>
    </>
  );
}
