import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import OverlayCloseButton from './OverlayCloseButton';
import '@testing-library/jest-dom';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';
import { useUIVisibleStore } from '../../../stores/stores';

let store;

describe('OverlayCloseButton', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useUIVisibleStore);
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
    jest.restoreAllMocks();
  });

  it('renders a OverlayCloseButton', () => {
    const { container } = render(<OverlayCloseButton />);
    const card = container.querySelector('#overlayCloseButton');

    expect(card).toBeInTheDocument();
  });

  it('calls hideOverlay when clicked', async () => {
    const { container } = render(<OverlayCloseButton />);

    const button = container.querySelector('#overlayCloseButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      const overlayVisible = store.getState().overlay;
      expect(overlayVisible).toEqual(false);
    });
  });
});
