import React from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/elements/searchOverlay/OverlayCloseButton.module.scss';
import { useUIVisibleStore } from '../../../stores/stores';

export default function OverlayCloseButton(): ReactElement {
  const setUIVisibility = useUIVisibleStore.setState;

  return (
    <button
      id={styles.overlayCloseButton}
      onClick={() => setUIVisibility({ overlay: false })}
    >
      <FontAwesomeIcon icon={faXmark} data-testid="x mark" />
    </button>
  );
}
