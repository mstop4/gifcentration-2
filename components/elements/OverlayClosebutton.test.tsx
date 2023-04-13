import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import OverlayCloseButton from './OverlayCloseButton';
import '@testing-library/jest-dom';

describe('SearchGifsButton', () => {
  it('renders a OverlayCloseButton', async () => {
    const { container } = render(
      <OverlayCloseButton hideOverlay={jest.fn()} />
    );
    const card = container.querySelector('#overlayCloseButton');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });
  });

  it('calls hideOverlay when clicked', async () => {
    const hideOverlayMock = jest.fn();
    const { container } = render(
      <OverlayCloseButton hideOverlay={hideOverlayMock} />
    );

    const button = container.querySelector('#overlayCloseButton') as Element;
    fireEvent.click(button);

    await waitFor(() => {
      expect(hideOverlayMock).toBeCalled();
    });
  });
});
