import type { ReactElement } from 'react';
import { GifErrorState } from '../../game/Game.typedefs';
import styles from '@/styles/elements/ui/Alert.module.scss';
import { useImageDataStore, useUIVisibleStore } from '../../game/Game.stores';

export default function Alert(): ReactElement {
  const alertVisible = useUIVisibleStore(state => state.alert);
  const gifErrorState = useImageDataStore(state => state.gifErrorState);

  let bodyClass, bodyText;
  const containerClass = alertVisible ? styles.alertOpen : styles.alertClosed;

  switch (gifErrorState) {
    case GifErrorState.NoGifs:
      bodyClass = styles.alertError;
      bodyText = (
        <>
          Could not find any GIFs!
          <br />
          Try a different search.
        </>
      );
      break;

    case GifErrorState.NotEnoughGifs:
      bodyClass = styles.alertWarning;
      bodyText = (
        <>
          Not enough GIFs found.
          <br />
          Reducing tableau size.
        </>
      );
      break;

    case GifErrorState.BadRequest:
      bodyClass = styles.alertError;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Bad Request
        </>
      );
      break;

    case GifErrorState.Forbidden:
      bodyClass = styles.alertError;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Forbidden
        </>
      );
      break;

    case GifErrorState.InternalServerError:
      bodyClass = styles.alertError;
      bodyText = (
        <>
          Could not search for GIFs.
          <br />
          Internal Server Error
        </>
      );
      break;

    case GifErrorState.UnknownError:
      bodyClass = styles.alertError;
      bodyText = <>An unknown error occured</>;
      break;

    case GifErrorState.Ok:
      bodyClass = '';
      bodyText = 'OK';
      break;
  }

  return (
    <div id={styles.alert} className={containerClass}>
      <span className={`${styles.alertBody} ${bodyClass}`}>{bodyText}</span>
    </div>
  );
}
