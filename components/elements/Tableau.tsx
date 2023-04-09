import React, { ReactElement } from 'react';
import Card from './Card';
import styles from '@/styles/elements/Tableau.module.scss';

const numCards = 18;

export default function Tableau(): ReactElement {
  const cardArray: ReactElement[] = [];
  for (let i = 0; i < numCards; ++i) {
    cardArray.push(<Card key={i} />);
  }

  return (
    <div className={styles.tableau}>
      <div className={styles.cardContainer}>{cardArray}</div>
    </div>
  );
}
