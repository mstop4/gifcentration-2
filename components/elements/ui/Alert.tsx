import type { ReactElement } from 'react';
import { GifErrorState } from '../../game/Game.enums';
import styles from '@/styles/elements/ui/Alert.module.scss';
import { useImageDataStore, useUIVisibleStore } from '../../../stores/stores';

export default function Alert(): ReactElement {
  const alertVisible = useUIVisibleStore(state => state.alert);
  const gifErrorState = useImageDataStore(state => state.gifErrorState);

  let bodyClass, bodyText;
  const containerClass = alertVisible ? styles.open : styles.closed;

  switch (gifErrorState) {
    case GifErrorState.NoGifs:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not find any GIFs!
          <br />
          Try a different search.
        </>
      );
      break;

    case GifErrorState.NotEnoughGifs:
      bodyClass = styles.warning;
      bodyText = (
        <>
          Not enough GIFs found.
          <br />
          Reducing tableau size.
        </>
      );
      break;

    case GifErrorState.BadRequest:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Request was malformed.
        </>
      );
      break;

    case GifErrorState.Forbidden:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          You don&apos;t have the required permissions.
        </>
      );
      break;

    case GifErrorState.URITooLong:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Search query was too long.
        </>
      );
      break;

    case GifErrorState.GatewayTimeout:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Search timed out.
        </>
      );
      break;

    case GifErrorState.ServiceUnavailable:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Service is unavailable.
        </>
      );
      break;

    case GifErrorState.InternalServerError:
      bodyClass = styles.error;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Internal server error.
        </>
      );
      break;

    case GifErrorState.UnknownError:
      bodyClass = styles.error;
      bodyText = <>An unknown error occured</>;
      break;

    case GifErrorState.Ok:
      bodyClass = '';
      bodyText = 'OK';
      break;
  }

  return (
    <div id={styles.alert} className={containerClass}>
      <span className={`${styles.body} ${bodyClass}`}>{bodyText}</span>
    </div>
  );
}
