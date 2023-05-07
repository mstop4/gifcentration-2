import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchTableauSize from './SearchTableauSize';
import '@testing-library/jest-dom';
import { useGameStore } from '../../../game/Game.stores';
import { getZustandStoreHooks } from '../../../../helpers/zustandTest';

let store;

const makeSearchTableauSize = (): ReactElement => <SearchTableauSize />;

describe('SearchTableauSize', () => {
  beforeEach(() => {
    store = getZustandStoreHooks(useGameStore);
  });

  afterEach(() => {
    store.unmount();
    store = null;
  });

  it('renders a SearchTableauSize', async () => {
    const { container } = render(makeSearchTableauSize());
    const size = container.querySelector('#searchNumCards');

    expect(size).toBeInTheDocument();
  });
});
