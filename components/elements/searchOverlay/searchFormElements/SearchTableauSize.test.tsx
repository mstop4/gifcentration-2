import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchTableauSize from './SearchTableauSize';
import '@testing-library/jest-dom';
import { useGameStore } from '../../../game/Game.stores';
import { getZustandHooks } from '../../../../helpers/zustandTest';

let zustandHooks;

const makeSearchTableauSize = (): ReactElement => <SearchTableauSize />;

describe('SearchTableauSize', () => {
  beforeEach(() => {
    zustandHooks = getZustandHooks(useGameStore);
  });

  afterEach(() => {
    zustandHooks.unmount();
    zustandHooks = null;
  });

  it('renders a SearchTableauSize', async () => {
    const { container } = render(makeSearchTableauSize());
    const size = container.querySelector('#searchNumCards');

    expect(size).toBeInTheDocument();
  });
});
