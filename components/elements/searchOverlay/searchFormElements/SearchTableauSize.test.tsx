import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import SearchTableauSize from './SearchTableauSize';
import '@testing-library/jest-dom';
import { useGameStore } from '../../../game/Game.stores';
import {
  cleanupZustandHooks,
  getZustandHooks,
} from '../../../../helpers/zustandTest';

const hookNames = ['idealTableauSize', 'setIdealTableauSize'];

const makeSearchTableauSize = (): ReactElement => <SearchTableauSize />;

describe('SearchTableauSize', () => {
  beforeEach(() => {
    getZustandHooks(useGameStore, hookNames);
  });

  afterEach(() => {
    cleanupZustandHooks(hookNames);
  });

  it('renders a SearchTableauSize', async () => {
    const { container } = render(makeSearchTableauSize());
    const size = container.querySelector('#searchNumCards');

    expect(size).toBeInTheDocument();
  });
});
