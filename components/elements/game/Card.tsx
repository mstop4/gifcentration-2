import React, { ReactElement } from 'react';
import { Measures, useMeasure } from '@react-hookz/web';
import { Gif } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { GameState } from '../../layout/Game.typedefs';
import styles from '@/styles/elements/game/Card.module.scss';

export type CardProps = {
  gameState: GameState;
  index: number;
  imageData: IGif;
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

  // Callback for onGifSeen event in Giphy Gif component
  const handleGifSeen = (): void => {
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

  // Determine aspect ratio of image and resize
  let newWidth = 100;
  let newHeight = 100;

  if (imageData?.images?.original) {
    const { width: originalWidth, height: originalHeight } =
      imageData.images.original;

    if (originalWidth >= originalHeight) {
      // Wide
      newWidth = (width ?? defaultSize) * gifSizeScale;
      newHeight =
        (((width ?? defaultSize) * originalHeight) / originalWidth) *
        gifSizeScale;
    } else {
      // Tall
      newHeight = (width ?? defaultSize) * gifSizeScale;
      newWidth =
        (((width ?? defaultSize) * originalWidth) / originalHeight) *
        gifSizeScale;
    }
  }

  const hideLinks = true; // gameState === GameState.Playing;

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
          {imageData && (
            <Gif
              gif={imageData}
              width={newWidth}
              height={newHeight}
              hideAttribution={hideLinks}
              noLink={hideLinks}
              onGifSeen={handleGifSeen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
