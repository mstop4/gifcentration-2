import React from 'react';
import { act, render } from '@testing-library/react';
import Title from './Title';
import '@testing-library/jest-dom';
import { useTitleVisibleStore } from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let store;

describe('Title', () => {
  beforeAll(() => {
    store = getZustandStoreHooks(useTitleVisibleStore);
  });

  beforeEach(() => {
    store.reset();
  });

  afterAll(() => {
    store.unmount();
    store = null;
  });

  it('renders a Title', () => {
    const { container } = render(<Title />);

    const title = container.querySelector('#title');
    expect(title).toBeInTheDocument();
  });

  it('should have a visible title', async () => {
    await act(() => store.setState({ titleVisible: true }));

    const { container } = render(<Title />);

    const title = container.querySelector('.mainTitle');
    expect(title).toHaveClass('elementVisible');
  });

  it('should have a hidden title', async () => {
    await act(() => store.setState({ titleVisible: false }));

    const { container } = render(<Title />);

    const title = container.querySelector('.mainTitle');
    expect(title).toHaveClass('elementHidden');
  });

  it('should have a visible subtitle', async () => {
    await act(() => store.setState({ subtitleVisible: true }));

    const { container } = render(<Title />);

    const title = container.querySelector('.subtitle');
    expect(title).toHaveClass('elementVisible');
  });

  it('should have a hidden subtitle', async () => {
    await act(() => store.setState({ titleVisible: false }));

    const { container } = render(<Title />);

    const title = container.querySelector('.subtitle');
    expect(title).toHaveClass('elementHidden');
  });
});
