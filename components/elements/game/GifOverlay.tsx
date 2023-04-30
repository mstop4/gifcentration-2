import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import type { ReactElement, ReactNode } from 'react';
import styles from '@/styles/elements/game/GifOverlay.module.scss';

export type GifOverlayProps = {
  children: ReactNode;
  active: boolean;
  linkUrl: string;
};

export default function GifOverlay(props: GifOverlayProps): ReactElement {
  const { children, active, linkUrl } = props;
  const overlayStyles = `${styles.gifOverlay} ${active ? '' : styles.inactive}`;

  return (
    <div className={overlayStyles}>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        {children}
        <span className={styles.gifOverlayLink}>
          <FontAwesomeIcon icon={faHandPointer} data-testid="link" />
        </span>
      </a>
    </div>
  );
}
