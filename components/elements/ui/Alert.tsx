import React, { ReactElement } from 'react';
import { GifErrorState } from '../../layout/Game';
import styles from '@/styles/elements/ui/Alert.module.scss';

export type AlertProps = {
  gifErrorState: GifErrorState;
  alertVisible: boolean;
};

export default function Alert(props: AlertProps): ReactElement {
  const { gifErrorState, alertVisible } = props;

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

    case GifErrorState.UnknownError:
      bodyClass = styles.alertError;
      bodyText = <>An unknown error occured</>;
      break;

    case GifErrorState.Ok:
      bodyClass = '';
      bodyText = 'OK';
      break;

    default:
      bodyClass = '';
      bodyText = null;
  }

  return (
    <div id={styles.alert} className={containerClass}>
      <span className={`${styles.alertBody} ${bodyClass}`}>{bodyText}</span>
    </div>
  );
}
