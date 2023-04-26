import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ClickHere from './ClickHere';
import '@testing-library/jest-dom';

describe('ClickHere', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders a ClickHere', () => {
    const { container } = render(
      <ClickHere
        visible={true}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        dispatchClickHereVisible={jest.fn()}
        dispatchTitleVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere');
    expect(clickHere).toBeInTheDocument();
  });

  it('should be visible', () => {
    const { container } = render(
      <ClickHere
        visible={true}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        dispatchClickHereVisible={jest.fn()}
        dispatchTitleVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    expect(clickHere).toHaveClass('elementVisible');
  });

  it('should be hidden', () => {
    const { container } = render(
      <ClickHere
        visible={false}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        dispatchClickHereVisible={jest.fn()}
        dispatchTitleVisible={jest.fn()}
        showSearchOverlay={jest.fn()}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    expect(clickHere).toHaveClass('elementHidden');
  });

  it('should show search overlay when not rendered', () => {
    const showSearchOverlayMock = jest.fn();
    const { container } = render(
      <ClickHere
        visible={false}
        titleVisible={{
          headerVisible: false,
          titleRendered: false,
          titleVisible: true,
          subtitleVisible: true,
        }}
        dispatchClickHereVisible={jest.fn()}
        dispatchTitleVisible={jest.fn()}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);
    expect(showSearchOverlayMock).toBeCalled();
  });

  it('calls dispatches and callbacks when clicked', () => {
    const dispatchClickHereVisibleMock = jest.fn();
    const dispatchTitleVisibleMock = jest.fn();
    const showSearchOverlayMock = jest.fn();

    const { container } = render(
      <ClickHere
        visible={true}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        dispatchClickHereVisible={dispatchClickHereVisibleMock}
        dispatchTitleVisible={dispatchTitleVisibleMock}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);

    jest.runAllTimers();

    expect(dispatchClickHereVisibleMock).toBeCalledTimes(2);
    expect(dispatchTitleVisibleMock).toBeCalledTimes(4);
    expect(showSearchOverlayMock).toBeCalled();
  });
});
