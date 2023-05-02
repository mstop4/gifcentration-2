import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchPopular from './SearchPopular';
import mockPopular from '../../../../mocks/popular.json';
import '@testing-library/jest-dom';

const makeSearchPopular = (): ReactElement => (
  <SearchPopular queries={mockPopular} setSearchQuery={jest.fn()} />
);

describe('SearchPopular', () => {
  it('renders a SearchPopular', async () => {
    const { container } = render(makeSearchPopular());
    const popular = container.querySelector('#searchPopular');

    expect(popular).toBeInTheDocument();
  });
});
