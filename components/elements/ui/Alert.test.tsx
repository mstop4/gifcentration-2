import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GifErrorState } from '../../layout/Game';
import Alert from './Alert';

describe('Alert', () => {
  it('renders an Alert', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.Ok} alertVisible={false} />
    );

    const alert = container.querySelector('#alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders the Alert in a closed state', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.Ok} alertVisible={false} />
    );

    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('alertClosed');
  });

  it('renders the Alert in a open state', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.Ok} alertVisible={true} />
    );

    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('alertOpen');
  });

  it('renders the no GIFs message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.NoGifs} alertVisible={false} />
    );

    const alert = container.querySelector('.alertBody');
    const alertTopText = screen.getByText(/could not find any gifs!/i);
    const alertBottomText = screen.getByText(/try a different search./i);

    expect(alert).toHaveClass('alertError');
    expect(alertTopText).toBeInTheDocument();
    expect(alertBottomText).toBeInTheDocument();
  });

  it('renders the not enough GIFs message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.NotEnoughGifs} alertVisible={false} />
    );

    const alert = container.querySelector('.alertBody');
    const alertTopText = screen.getByText(/not enough gifs found./i);
    const alertBottomText = screen.getByText(/reducing tableau size./i);

    expect(alert).toHaveClass('alertWarning');
    expect(alertTopText).toBeInTheDocument();
    expect(alertBottomText).toBeInTheDocument();
  });

  it('renders the unknown error message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.UnknownError} alertVisible={false} />
    );

    const alert = container.querySelector('.alertBody');
    const alertText = screen.getByText(/An unknown error occured/i);

    expect(alert).toHaveClass('alertError');
    expect(alertText).toBeInTheDocument();
  });

  it('renders the OK message', () => {
    render(<Alert gifErrorState={GifErrorState.Ok} alertVisible={false} />);

    const alertText = screen.getByText(/ok/i);
    expect(alertText).toBeInTheDocument();
  });
});
