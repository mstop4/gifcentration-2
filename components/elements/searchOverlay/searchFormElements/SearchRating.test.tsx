import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchRating from './SearchRating';
import '@testing-library/jest-dom';

describe('SearchRating', () => {
  it('renders a SearchRating', () => {
    const { container } = render(
      <SearchRating rating="g" setRating={jest.fn()} />,
    );
    const rating = container.querySelector('#ratingList');

    expect(rating).toBeInTheDocument();
  });

  it('sets rating after selecting from select element', async () => {
    const setRatingMock = jest.fn();
    const { container } = render(
      <SearchRating rating="g" setRating={setRatingMock} />,
    );
    const rating = container.querySelector('#ratingList') as Element;
    fireEvent.change(rating, { target: { value: 2 } });

    await waitFor(() => {
      expect(setRatingMock).toBeCalled();
    });
  });
});
