import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GifErrorState } from '../../game/Game.enums';
import Alert from './Alert';
import { useUIVisibleStore, useImageDataStore } from '../../../stores/stores';
import { getZustandStoreHooks } from '../../../helpers/zustandTest';

let uiVisibleStore;
let imageDataStore;

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
    uiVisibleStore = getZustandStoreHooks(useUIVisibleStore);
    imageDataStore = getZustandStoreHooks(useImageDataStore);
  });

  beforeEach(() => {
    uiVisibleStore.reset();
    imageDataStore.reset();
  });

  afterAll(() => {
    uiVisibleStore.unmount();
    imageDataStore.unmount();
    uiVisibleStore = null;
    imageDataStore = null;
  });

  it('renders an Alert', () => {
    const { container } = render(<Alert />);

    const alert = container.querySelector('#alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders the Alert in a closed state', () => {
    const { container } = render(<Alert />);

    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('closed');
  });

  it('renders the Alert in a open state', async () => {
    await act(() => uiVisibleStore.setState({ alert: true }));

    const { container } = render(<Alert />);
    const alert = container.querySelector('#alert');
    expect(alert).toHaveClass('open');
  });

  it('renders the no GIFs message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.NoGifs });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not find any gifs!/i,
      /try a different search./i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the not enough GIFs message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.NotEnoughGifs });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /not enough gifs found./i,
      /reducing tableau size./i
    );

    expect(alertElem).toHaveClass('warning');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the bad request message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.BadRequest });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /request was malformed./i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the forbidden message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.Forbidden });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /you don't have the required permissions./i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the URI too long message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.URITooLong });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /search query was too long./i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the gateway timeout message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({
        gifErrorState: GifErrorState.GatewayTimeout,
      });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /search timed out./i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the service unavailable message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({
        gifErrorState: GifErrorState.ServiceUnavailable,
      });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /service is unavailable/i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the internal server error message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({
        gifErrorState: GifErrorState.InternalServerError,
      });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText, bottomText } = testHelper(
      container,
      '.body',
      /could not search for gifs./i,
      /internal server error/i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
    expect(bottomText).toBeInTheDocument();
  });

  it('renders the unknown error message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.UnknownError });
    });

    const { container } = render(<Alert />);

    const { alertElem, topText } = testHelper(
      container,
      '.body',
      /An unknown error occured/i
    );

    expect(alertElem).toHaveClass('error');
    expect(topText).toBeInTheDocument();
  });

  it('renders the OK message', async () => {
    await act(() => {
      uiVisibleStore.setState({ alert: true });
      imageDataStore.setState({ gifErrorState: GifErrorState.Ok });
    });

    render(<Alert />);

    const alertText = screen.getByText(/ok/i);
    expect(alertText).toBeInTheDocument();
  });
});
