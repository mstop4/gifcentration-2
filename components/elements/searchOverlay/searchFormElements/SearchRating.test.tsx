import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchRating from './SearchRating';
import '@testing-library/jest-dom';

const makeSearchRating = (): ReactElement => (
  <SearchRating rating="g" setRating={jest.fn()} />
);

describe('SearchRating', () => {
  it('renders a SearchRating', async () => {
    const { container } = render(makeSearchRating());
    const rating = container.querySelector('#searchRatingList');

    expect(rating).toBeInTheDocument();
  });
});
