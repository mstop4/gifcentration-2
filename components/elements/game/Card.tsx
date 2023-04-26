import React, { ReactElement } from 'react';
import { Measures, useMeasure } from '@react-hookz/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { GameState } from '../../layout/Game.typedefs';
import styles from '@/styles/elements/game/Card.module.scss';
import {
  SortedGifData,
  calculateTargetSize,
  findBestRepresentations,
} from '../../../helpers/gif';

export type CardProps = {
  gameState: GameState;
  index: number;
  imageData: SortedGifData;
  flipped: boolean;
  matched: boolean;
  handleCardClick: (index: number) => void;
  updateImageLoaded: (index: number) => void;
};

const defaultSize = 100;
const gifSizeScale = 0.9;

export default function Card(props: CardProps): ReactElement {
  const {
    index,
    imageData,
    flipped,
    matched,
    handleCardClick,
    updateImageLoaded,
  } = props;

  const handleClick = (): void => {
    handleCardClick(index);
  };

  // Callback for onLoad event in picture element
  const handleGifLoad = (): void => {
    updateImageLoaded(index);
  };

  // Determine CSS classes
  const cardBodyClasses = `${styles.cardBody} ${flipped ? styles.flipped : ''}`;
  const cardBackClasses = `${styles.cardFace} ${styles.back} ${
    matched ? styles.matched : ''
  }`;

  // Calculate size multipler of FA question mark
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const { width } = measurements || ({} as Measures);
  const sizeMultipler = Math.round(Math.min(10, width / 25)) || 1;
  const size = `${sizeMultipler}x` as SizeProp;

  const { targetWidth, targetHeight } = calculateTargetSize(
    imageData,
    width,
    gifSizeScale,
    defaultSize
  );

  // Find best representations
  const { gif, webp } = findBestRepresentations(imageData, targetWidth, true);

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={cardBodyClasses} ref={ref}>
        <div className={`${styles.cardFace} ${styles.front}`}>
          <FontAwesomeIcon
            icon={faQuestion}
            size={size}
            data-testid="question mark"
          />
        </div>
        <div className={cardBackClasses}>
          <picture onLoad={handleGifLoad}>
            {webp.url && <source type="image/webp" srcSet={webp.url} />}
            <img
              src={gif.url ?? ''}
              alt={`${index}. ${imageData.title}`}
              width={targetWidth}
              height={targetHeight}
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
