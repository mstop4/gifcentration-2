import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchPopularChip from './SearchPopularChip';
import '@testing-library/jest-dom';

const makeSearchPopularChip = (): ReactElement => (
  <SearchPopularChip query="test" setSearchQuery={jest.fn()} />
);

describe('SearchPopularChip', () => {
  it('renders a SearchPopularChip', async () => {
    const { container } = render(makeSearchPopularChip());
    const chip = container.querySelector('.queryChip');

    expect(chip).toBeInTheDocument();
  });
});
