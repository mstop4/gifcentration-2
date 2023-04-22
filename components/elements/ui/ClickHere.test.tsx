import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ClickHere from './ClickHere';
import '@testing-library/jest-dom';

describe('ClickHere', () => {
  it('renders a ClickHere', () => {
    const { container } = render(
      <ClickHere
        visible={true}
        dispatchVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere');
    expect(clickHere).toBeInTheDocument();
  });

  it('should be visible', async () => {
    const { container } = render(
      <ClickHere
        visible={true}
        dispatchVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;

    expect(clickHere).toHaveClass('clickHereVisible');
  });

  it('should be hidden', async () => {
    const { container } = render(
      <ClickHere
        visible={false}
        dispatchVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;

    expect(clickHere).toHaveClass('clickHereHidden');
  });

  it('calls setVisible and showSearchOverlay when clicked', async () => {
    const dispatchVisibleMock = jest.fn();
    const showSearchOverlayMock = jest.fn();

    const { container } = render(
      <ClickHere
        visible={true}
        dispatchVisible={dispatchVisibleMock}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);

    await waitFor(() => {
      expect(dispatchVisibleMock).toBeCalledWith({
        prop: 'visible',
        value: false,
      });
      expect(showSearchOverlayMock).toBeCalled();
    });
  });

  it('calls dispatchVisibleMock on transition end', async () => {
    const dispatchVisibleMock = jest.fn();

    const { container } = render(
      <ClickHere
        visible={true}
        dispatchVisible={dispatchVisibleMock}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.transitionEnd(clickHere);

    await waitFor(() => {
      expect(dispatchVisibleMock).toBeCalledWith({
        prop: 'rendered',
        value: false,
      });
    });
  });
});
