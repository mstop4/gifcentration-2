import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import ClickHere from './ClickHere';
import '@testing-library/jest-dom';
import {
  useClickHereVisibleStore,
  useTitleVisibleStore,
} from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let clickHereVisibleStore;
let titleVisibleStore;

describe('ClickHere', () => {
  beforeAll(() => {
    clickHereVisibleStore = getZustandStoreHooks(useClickHereVisibleStore);
    titleVisibleStore = getZustandStoreHooks(useTitleVisibleStore);
    jest.useFakeTimers();
  });

  beforeEach(() => {
    clickHereVisibleStore.reset();
    titleVisibleStore.reset();
  });

  afterAll(() => {
    clickHereVisibleStore.unmount();
    titleVisibleStore.unmount();
    clickHereVisibleStore = null;
    titleVisibleStore = null;
    jest.useRealTimers();
  });

  it('renders a ClickHere', () => {
    const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

    const clickHere = container.querySelector('#clickHere');
    expect(clickHere).toBeInTheDocument();
  });

  it('should be visible', async () => {
    await act(() =>
      clickHereVisibleStore.setState({ visible: true, rendered: true })
    );

    await waitFor(() => {
      const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

      const clickHere = container.querySelector('#clickHere') as Element;
      expect(clickHere).toHaveClass('elementVisible');
    });
  });

  it('should be hidden', async () => {
    await act(() =>
      clickHereVisibleStore.setState({ visible: false, rendered: true })
    );

    await waitFor(() => {
      const { container } = render(<ClickHere showSearchOverlay={jest.fn()} />);

      const clickHere = container.querySelector('#clickHere') as Element;
      expect(clickHere).toHaveClass('elementHidden');
    });
  });

  it('should show search overlay and modify title states when clicked when title is visible', async () => {
    await act(() => {
      clickHereVisibleStore.setState({ visible: true, rendered: true });
      titleVisibleStore.setState({ titleRendered: true });
    });

    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <ClickHere showSearchOverlay={showSearchOverlayMock} />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);

    await act(() => jest.runAllTimers());
    await waitFor(() => {
      const { titleVisible, subtitleVisible, titleRendered, headerVisible } =
        titleVisibleStore.getState();
      const { visible, rendered } = clickHereVisibleStore.getState();

      expect(showSearchOverlayMock).toBeCalled();
      expect(titleVisible).toEqual(false);
      expect(subtitleVisible).toEqual(false);
      expect(titleRendered).toEqual(false);
      expect(headerVisible).toEqual(true);
      expect(visible).toEqual(false);
      expect(rendered).toEqual(false);
    });
  });

  it('should show search overlay immediately when clicked when title is hidden', async () => {
    await act(() => {
      clickHereVisibleStore.setState({ visible: true, rendered: true });
      titleVisibleStore.setState({ titleRendered: false });
    });

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
