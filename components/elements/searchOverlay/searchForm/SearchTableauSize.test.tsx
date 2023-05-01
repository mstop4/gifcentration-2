import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchTableauSize from './SearchTableauSize';
import '@testing-library/jest-dom';

const makeSearchTableauSize = (): ReactElement => (
  <SearchTableauSize tableauSize="18" setTableauSize={jest.fn()} />
);

describe('SearchTableauSize', () => {
  it('renders a SearchTableauSize', async () => {
    const { container } = render(makeSearchTableauSize());
    const form = container.querySelector('#searchNumCards');

    expect(form).toBeInTheDocument();
  });
});
