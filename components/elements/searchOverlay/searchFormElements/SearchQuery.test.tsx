import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchQuery from './SearchQuery';
import '@testing-library/jest-dom';

const makeSearchQuery = (): ReactElement => (
  <SearchQuery searchQuery="" setSearchQuery={jest.fn()} />
);

describe('SearchQuery', () => {
  it('renders a SearchQuery', async () => {
    const { container } = render(makeSearchQuery());
    const query = container.querySelector('#searchQuery');

    expect(query).toBeInTheDocument();
  });
});
