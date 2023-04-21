import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ClickHere from './ClickHere';
import '@testing-library/jest-dom';

describe('ClickHere', () => {
  it('renders a ClickHere', () => {
    const { container } = render(
      <ClickHere setVisible={jest.fn()} showSearchOverlay={jest.fn()} />
    );

    const clickHere = container.querySelector('#clickHere');
    expect(clickHere).toBeInTheDocument();
  });

  it('calls setVisible and showSearchOverlay when clicked', () => {
    const setVisibleMock = jest.fn();
    const showSearchOverlayMock = jest.fn();

    const { container } = render(
      <ClickHere
        setVisible={setVisibleMock}
        showSearchOverlay={showSearchOverlayMock}
      />
    );

    const clickHere = container.querySelector('#clickHere') as Element;
    fireEvent.click(clickHere);
    expect(setVisibleMock).toBeCalledWith(false);
    expect(showSearchOverlayMock).toBeCalled();
  });
});
