import type { ReactElement } from 'react';
import styles from '@/styles/elements/ui/MainLoadingIndicator.module.scss';
import Spinner from './Spinner';

export default function MainLoadingIndicator(): ReactElement {
  return (
    <div id={styles.mainLoadingIndicator}>
      <Spinner />
      Loading...
    </div>
  );
}
