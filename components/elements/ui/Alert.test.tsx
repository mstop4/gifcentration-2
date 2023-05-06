import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GifErrorState } from '../../game/Game.typedefs';
import Alert from './Alert';
import { useUIVisibleStore } from '../../game/Game.stores';
import { getZustandHooks } from '../../../helpers/zustandTest';

let zustandHooks;

const testHelper = (
  container: HTMLElement,
  elemName: string,
  topTextRegEx: RegExp,
  bottomTextRegEx?: RegExp
) => {
  return {
    alertElem: container.querySelector(elemName),
    topText: screen.getByText(topTextRegEx),
    bottomText: bottomTextRegEx ? screen.getByText(bottomTextRegEx) : null,
  };
};

describe('Alert', () => {
  beforeAll(() => {
    zustandHooks = getZustandHooks(useUIVisibleStore);
  });

  beforeEach(() => {
    zustandHooks.reset();
  });

  afterAll(() => {
    zustandHooks.unmount();
    zustandHooks = null;
  });

  it('renders an Alert', () => {
    const { container } = render(<Alert gifErrorState={GifErrorState.Ok} />);

    const alert = container.querySelector('#alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders the Alert in a closed state', () => {
    const { container } = render(<Alert gifErrorState={GifErrorState.Ok} />);

    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('alertClosed');
  });

  it('renders the Alert in a open state', async () => {
    await act(() => zustandHooks.setState({ alert: true }));

    const { container } = render(<Alert gifErrorState={GifErrorState.Ok} />);

    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('alertOpen');
  });

  it('renders the no GIFs message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.NoGifs} />
    );

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.alertBody',
      /could not find any gifs!/i,
      /try a different search./i
    );

    expect(alertElem).toHaveClass('alertError');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the not enough GIFs message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.NotEnoughGifs} />
    );

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.alertBody',
      /not enough gifs found./i,
      /reducing tableau size./i
    );

    expect(alertElem).toHaveClass('alertWarning');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the bad request message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.BadRequest} />
    );

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.alertBody',
      /could not search for gifs./i,
      /bad request/i
    );

    expect(alertElem).toHaveClass('alertError');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the forbidden message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.Forbidden} />
    );

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.alertBody',
      /could not search for gifs./i,
      /forbidden/i
    );

    expect(alertElem).toHaveClass('alertError');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the internal server error message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.InternalServerError} />
    );

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.alertBody',
      /could not search for gifs./i,
      /internal server error/i
    );

    expect(alertElem).toHaveClass('alertError');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the unknown error message', () => {
    const { container } = render(
      <Alert gifErrorState={GifErrorState.UnknownError} />
    );

    const { alertElem, topText } = testHelper(
      container,
      '.alertBody',
      /An unknown error occured/i
    );

    expect(alertElem).toHaveClass('alertError');
    expect(topText).toBeInTheDocument();
  });

  it('renders the OK message', () => {
    render(<Alert gifErrorState={GifErrorState.Ok} />);

    const alertText = screen.getByText(/ok/i);
    expect(alertText).toBeInTheDocument();
  });
});
