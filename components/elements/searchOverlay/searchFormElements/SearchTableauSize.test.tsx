import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchTableauSize from './SearchTableauSize';
import '@testing-library/jest-dom';
import { useGameStore } from '../../../../stores/stores';
import { getZustandStoreHooks } from '../../../../helpers/zustandTest';

let store;

describe('SearchTableauSize', () => {
  beforeEach(() => {
    store = getZustandStoreHooks(useGameStore);
  });

  afterEach(() => {
    store.unmount();
    store = null;
  });

  it('renders a SearchTableauSize', () => {
    const { container } = render(<SearchTableauSize />);
    const size = container.querySelector('#numCards');

    expect(size).toBeInTheDocument();
  });

  it('sets tableau size after typing new tableau size', async () => {
    const { container } = render(<SearchTableauSize />);
    const tableau = container.querySelector('#numCards') as Element;
    fireEvent.change(tableau, { target: { value: 24 } });

    await waitFor(() => {
      const tableauSize = store.getState().idealTableauSize;
      expect(tableauSize).toEqual('24');
    });
  });
});
