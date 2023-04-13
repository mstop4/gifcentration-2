import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/elements/OverlayCloseButton.module.scss';

export type OverlayCloseButtonProps = {
  hideOverlay: () => void;
};

export default function OverlayCloseButton(
  props: OverlayCloseButtonProps
): ReactElement {
  return (
    <button id={styles.overlayCloseButton} onClick={props.hideOverlay}>
      <FontAwesomeIcon icon={faXmark} data-testid="x mark" />
    </button>
  );
}
