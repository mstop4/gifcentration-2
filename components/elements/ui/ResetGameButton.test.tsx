import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import ResetGameButton from './ResetGameButton';
import '@testing-library/jest-dom';
import { GameState } from '../../game/Game.enums';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';
import { useGameStore } from '../../../stores/stores';

let store;

describe('ResetGameButton', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useGameStore);
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
  });

  it('renders a ResetGameButton', async () => {
    await act(() => store.setState({ gameState: GameState.Playing }));

    const { container } = render(<ResetGameButton resetCards={jest.fn()} />);

    const card = container.querySelector('#resetGameButton');
    expect(card).toBeInTheDocument();
  });

  it('calls resetCards when clicked when playing', async () => {
    await act(() => store.setState({ gameState: GameState.Playing }));

    const resetCardsMock = jest.fn();
    const { container } = render(
      <ResetGameButton resetCards={resetCardsMock} />,
    );

    const button = container.querySelector('#resetGameButton') as Element;
    fireEvent.click(button);
    expect(resetCardsMock).toBeCalled();
  });

  it("doesn't call resetCards when clicked when not playing", async () => {
    await act(() => store.setState({ gameState: GameState.Loading }));

    const resetCardsMock = jest.fn();
    const { container } = render(
      <ResetGameButton resetCards={resetCardsMock} />,
    );

    const button = container.querySelector('#resetGameButton') as Element;
    fireEvent.click(button);
    expect(resetCardsMock).not.toBeCalled();
  });
});
