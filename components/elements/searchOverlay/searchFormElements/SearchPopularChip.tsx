import type { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export type SearchPopularChipProps = {
  query: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchPopularChip(props: SearchPopularChipProps) {
  const { query, setSearchQuery } = props;

  const handleClick: MouseEventHandler<HTMLSpanElement> = e => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <span className={styles.queryChip} onClick={handleClick}>
      <span className={styles.queryChipText}>{query}</span>
    </span>
  );
}
