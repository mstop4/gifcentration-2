import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import ClickHere from './ClickHere';
import '@testing-library/jest-dom';
import { useClickHereVisibleStore } from '../../game/Game.stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let store;

describe('ClickHere', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useClickHereVisibleStore);
    jest.useFakeTimers();
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
    jest.useRealTimers();
  });

  it('renders a ClickHere', () => {
    const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

    const clickHere = container.querySelector('#clickHere');
    expect(clickHere).toBeInTheDocument();
  });

  it('should be visible', async () => {
    await act(() => store.setState({ visible: true }));

    await waitFor(() => {
      const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

      const clickHere = container.querySelector('#clickHere') as Element;
      expect(clickHere).toHaveClass('elementVisible');
    });
  });

  it('should be hidden', async () => {
    await act(() => store.setState({ visible: false }));

    await waitFor(() => {
      const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

      const clickHere = container.querySelector('#clickHere') as Element;
      expect(clickHere).toHaveClass('elementHidden');
    });
  });

  it('should show search overlay when not rendered', async () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <ClickHere showSearchOverlay={showSearchOverlayMock} />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
    });
  });

  it('calls dispatches and callbacks when clicked', async () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <ClickHere showSearchOverlay={showSearchOverlayMock} />
    );

    const clickHere = container.querySelector('#clickHere') as Element;

    fireEvent.click(clickHere);
    await act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(showSearchOverlayMock).toBeCalled();
    });
  });
});
