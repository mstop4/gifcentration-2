import mockPopular from '../../../../mocks/popular.json';
import type { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';
import SearchPopularChip from './SearchPopularChip';

export type SearchPopularProps = {
  queries: string[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchPopular(props: SearchPopularProps) {
  const { queries, setSearchQuery } = props;

  const chips = mockPopular.slice(0, 10).map(query => (
    // eslint-disable-next-line react/jsx-key
    <SearchPopularChip
      key={query}
      query={query}
      setSearchQuery={setSearchQuery}
    />
  ));

  return (
    <div id={styles.searchPopular}>
      <label className={styles.searchL2Label}>Popular Searches</label>
      <span className={styles.queryList}>{chips}</span>
    </div>
  );
}
