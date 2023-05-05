import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SearchGifsButton from './SearchGifsButton';
import '@testing-library/jest-dom';
import { GameState } from '../../game/Game.typedefs';

describe('SearchGifsButton', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders a SearchGifsButton', () => {
    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        showSearchOverlay={jest.fn()}
        dispatchTitleVisible={jest.fn()}
        dispatchClickHereVisible={jest.fn()}
      />
    );
    const button = container.querySelector('#searchGifsButton');
    expect(button).toBeInTheDocument();
  });

  it('calls showSearchOverlay and dispatchVisible when clicked when not busy', () => {
    const showSearchOverlayMock = jest.fn();
    const dispatchTitleVisibleMock = jest.fn();
    const dispatchClickHereVisibleMock = jest.fn();

    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Playing}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        showSearchOverlay={showSearchOverlayMock}
        dispatchTitleVisible={dispatchTitleVisibleMock}
        dispatchClickHereVisible={dispatchClickHereVisibleMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    jest.runAllTimers();

    expect(showSearchOverlayMock).toBeCalled();
    expect(dispatchClickHereVisibleMock).toBeCalledTimes(2);
    expect(dispatchTitleVisibleMock).toBeCalledTimes(4);
  });

  it("doesn't call showSearchOverlay when clicked when already searching/loading", () => {
    const showSearchOverlayMock = jest.fn();
    const dispatchTitleVisibleMock = jest.fn();
    const dispatchClickHereVisibleMock = jest.fn();

    const { container } = render(
      <SearchGifsButton
        gameState={GameState.Searching}
        titleVisible={{
          headerVisible: false,
          titleRendered: true,
          titleVisible: true,
          subtitleVisible: true,
        }}
        showSearchOverlay={showSearchOverlayMock}
        dispatchTitleVisible={dispatchTitleVisibleMock}
        dispatchClickHereVisible={dispatchClickHereVisibleMock}
      />
    );

    const button = container.querySelector('#searchGifsButton') as Element;
    fireEvent.click(button);

    jest.runAllTimers();

    expect(showSearchOverlayMock).not.toBeCalled();
    expect(dispatchClickHereVisibleMock).not.toBeCalled();
    expect(dispatchTitleVisibleMock).not.toBeCalled();
  });
});
