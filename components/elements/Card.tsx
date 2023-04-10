import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Measures, useMeasure } from '@react-hookz/web';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
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

  // Calculate size multipler of FA question mark
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const { width } = measurements || ({} as Measures);
  const sizeMultipler = Math.round(Math.min(10, width / 25)) || 1;
  const size = `${sizeMultipler}x` as SizeProp;

  return (
    <div className={styles.cardHolder} onClick={handleCardClick}>
      <div className={cardBodyClasses} ref={ref}>
        <div className={`${styles.cardFace} ${styles.front}`}>
          <FontAwesomeIcon
            icon={faQuestion}
            size={size}
            data-testid="question mark"
          />
        </div>
        <div className={cardBackClasses}>
          <div className={styles.gif}>Back</div>
        </div>
      </div>
    </div>
  );
}
