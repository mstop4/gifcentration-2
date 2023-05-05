import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchPopular from './SearchPopular';
import mockPopular from '../../../../mockData/popular.json';
import '@testing-library/jest-dom';
import { TopSearchResult } from '../../../../lib/mongodb/helpers';

const makeSearchPopular = (): ReactElement => (
  <SearchPopular
    topSearches={mockPopular as unknown as TopSearchResult[]}
    setSearchQuery={jest.fn()}
  />
);

describe('SearchPopular', () => {
  it('renders a SearchPopular', async () => {
    const { container } = render(makeSearchPopular());
    const popular = container.querySelector('#searchPopular');

    expect(popular).toBeInTheDocument();
  });
});
