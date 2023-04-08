import React, { ReactElement, useState } from 'react';
import styles from '@/styles/elements/Card.module.scss';

export default function Card(): ReactElement {
  const [flipped, setFlipped] = useState(false);
  const [active, setActive] = useState(true);
  const [matched, setMatched] = useState(false);

  const handleCardClick = function (): void {
    setFlipped(!flipped);
  };

  const cardBodyClasses = `${styles.cardBody} ${
    active ? styles.active : styles.inactive
  } ${flipped ? styles.flipped : ''}`;

  const cardBackClasses = `${styles.cardFace} ${styles.back} ${
    matched ? styles.matched : ''
  }`;

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={cardBodyClasses}>
        <div className={`${styles.cardFace} ${styles.front}`}>?</div>
        <div className={cardBackClasses}>
          <div className={styles.gif}>Back</div>
        </div>
      </div>
    </div>
  );
}
