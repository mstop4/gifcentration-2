import type { Dispatch, SetStateAction } from 'react';
import SearchPopularChip from './SearchPopularChip';
import clientConfig from '../../../../config/clientConfig';
import { TopSearchResult } from '../../../../lib/mongodb/helpers';
import styles from '@/styles/elements/searchOverlay/SearchForm.module.scss';
import { filterObscenities } from '../../../../helpers/obscenityFilter';

export type SearchPopularProps = {
  topSearches: TopSearchResult[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchPopular(props: SearchPopularProps) {
  const { topSearches, setSearchQuery } = props;

  const filteredTopSearches = filterObscenities(topSearches);

  const chips = filteredTopSearches
    ?.slice(0, clientConfig.searchForm.maxPopularSearches)
    ?.map(query => (
      <SearchPopularChip
        key={query._id}
        query={query._id}
        setSearchQuery={setSearchQuery}
      />
    ));

  return (
    <div id={styles.popular}>
      <label className={styles.L2Label}>Popular Searches</label>
      <span id={styles.queryList}>
        {chips.length > 0 ? (
          chips
        ) : (
          <span className={styles.nothing}>Nothing here yet...</span>
        )}
      </span>
    </div>
  );
}
