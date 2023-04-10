import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Measures, useMeasure } from '@react-hookz/web';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import styles from '@/styles/elements/Card.module.scss';

export type CardProps = {
  index: number;
  imageIndex: number;
  flipped: boolean;
  active: boolean;
  matched: boolean;
  handleCardClick: (index: number) => void;
};

export default function Card(props: CardProps): ReactElement {
  const { index, imageIndex, flipped, active, matched, handleCardClick } =
    props;

  const onClick = (): void => {
    handleCardClick(index);
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
    <div className={styles.cardHolder} onClick={onClick}>
      <div className={cardBodyClasses} ref={ref}>
        <div className={`${styles.cardFace} ${styles.front}`}>
          <FontAwesomeIcon
            icon={faQuestion}
            size={size}
            data-testid="question mark"
          />
        </div>
        <div className={cardBackClasses}>
          <div className={styles.gif}>
            {index} - {imageIndex}
          </div>
        </div>
      </div>
    </div>
  );
}
