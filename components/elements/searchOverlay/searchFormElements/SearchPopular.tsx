import type { Dispatch, SetStateAction } from 'react';
import SearchPopularChip from './SearchPopularChip';
import clientConfig from '../../../../config/clientConfig';
import { TopSearchResult } from '../../../../lib/mongodb/helpers';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';

export type SearchPopularProps = {
  topSearches: TopSearchResult[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchPopular(props: SearchPopularProps) {
  const { topSearches, setSearchQuery } = props;

  const chips = topSearches
    ?.slice(0, clientConfig.searchForm.maxPopularSearches)
    ?.map(query => (
      <SearchPopularChip
        key={query._id}
        query={query._id}
        setSearchQuery={setSearchQuery}
      />
    ));

  return (
    <div id={styles.searchPopular}>
      <label className={styles.searchL2Label}>Popular Searches</label>
      <span className={styles.queryList}>
        {chips.length > 0 ? (
          chips
        ) : (
          <span className={styles.nothing}>Nothing here yet...</span>
        )}
      </span>
    </div>
  );
}
