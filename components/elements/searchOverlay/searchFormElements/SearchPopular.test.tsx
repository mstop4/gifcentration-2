import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPopular from './SearchPopular';
import mockPopular from '../../../../mockData/popular.json';
import '@testing-library/jest-dom';
import { TopSearchResult } from '../../../../lib/mongodb/helpers';
import clientConfig from '../../../../config/clientConfig';

describe('SearchPopular', () => {
  it('renders a SearchPopular', () => {
    const { container } = render(
      <SearchPopular
        topSearches={mockPopular as unknown as TopSearchResult[]}
        setSearchQuery={jest.fn()}
      />,
    );
    const popular = container.querySelector('#popular');

    expect(popular).toBeInTheDocument();
  });

  it('has no chips', () => {
    const { container } = render(
      <SearchPopular
        topSearches={[] as unknown as TopSearchResult[]}
        setSearchQuery={jest.fn()}
      />,
    );
    const numChips = container.querySelectorAll('.queryChip').length;

    expect(numChips).toEqual(0);
  });

  it('the number of chips is limited by maxPopularSearches', () => {
    const doublePopular = [...mockPopular, ...mockPopular];
    const { container } = render(
      <SearchPopular
        topSearches={doublePopular as unknown as TopSearchResult[]}
        setSearchQuery={jest.fn()}
      />,
    );
    const numChips = container.querySelectorAll('.queryChip').length;

    expect(numChips).toBeLessThanOrEqual(
      clientConfig.searchForm.maxPopularSearches,
    );
  });

  it('obscene search terms should be filtered', () => {
    render(
      <SearchPopular
        topSearches={mockPopular as unknown as TopSearchResult[]}
        setSearchQuery={jest.fn()}
      />,
    );

    expect(screen.queryByText('boobs')).not.toBeInTheDocument();
    expect(screen.queryByText('penis penis penis')).not.toBeInTheDocument();
    expect(screen.queryByText('shitcock')).not.toBeInTheDocument();
    expect(screen.queryByText('p0rn')).not.toBeInTheDocument();
  });
});
