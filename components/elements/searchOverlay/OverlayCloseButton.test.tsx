import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import OverlayCloseButton from './OverlayCloseButton';
import '@testing-library/jest-dom';
import { getZustandHooks } from '../../../helpers/zustandTest';
import { useUIVisibleStore } from '../../game/Game.stores';

let zustandHooks;

describe('OverlayCloseButton', () => {
  beforeAll(() => {
    zustandHooks = getZustandHooks(useUIVisibleStore);
  });

  beforeEach(() => {
    zustandHooks.reset();
  });

  afterAll(() => {
    zustandHooks.unmount();
    zustandHooks = null;
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
      const overlayVisible = zustandHooks.getState().overlay;
      expect(overlayVisible).toEqual(false);
    });
  });
});
