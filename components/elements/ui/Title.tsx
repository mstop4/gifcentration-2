import React, { ReactElement } from 'react';
import styles from '@/styles/elements/ui/Title.module.scss';

export default function Title(): ReactElement {
  return (
    <div id={styles.title}>
      <h1>GIFcentration 2</h1>
      <h2>Card-matching game powered by Giphy</h2>
    </div>
  );
}
