import { Measures, useMeasure } from '@react-hookz/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import GifOverlay from './GifOverlay';
import {
  SortedGifData,
  calculateTargetSize,
  findBestRepresentations,
} from '../../../helpers/gif';
import clientConfig from '../../../config/clientConfig';
import type { ReactElement } from 'react';
import styles from '@/styles/elements/game/Card.module.scss';

export type CardProps = {
  reduceMotions: boolean;
  index: number;
  imageData: SortedGifData;
  flipped: boolean;
  matched: boolean;
  handleCardClick: (index: number) => void;
  updateImageLoaded: (index: number) => void;
};

const { defaultSize, gifSizeScale } = clientConfig.card;

export default function Card(props: CardProps): ReactElement {
  const {
    reduceMotions,
    index,
    imageData,
    flipped,
    matched,
    handleCardClick,
    updateImageLoaded,
  } = props;

  const handleClick = () => {
    handleCardClick(index);
  };

  // Callback for onLoad event in picture element
  const handleGifLoad = () => {
    updateImageLoaded(index);
  };

  // Determine CSS classes
  const cardBodyClasses = `${styles.body} ${flipped ? styles.flipped : ''}`;
  const cardBackClasses = `${styles.face} ${styles.back} ${
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
    defaultSize,
  );

  // Find best representations
  const { gif, webp } = findBestRepresentations(
    imageData,
    targetWidth,
    !reduceMotions,
  );

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={cardBodyClasses} ref={ref}>
        <div className={`${styles.face} ${styles.front}`}>
          <FontAwesomeIcon
            icon={faQuestion}
            size={size}
            data-testid="question mark"
          />
        </div>
        <div className={cardBackClasses}>
          <GifOverlay active={matched} linkUrl={imageData?.linkUrl}>
            <picture onLoad={handleGifLoad} data-testid="card picture">
              {webp.url && <source type="image/webp" srcSet={webp.url} />}
              <img
                className={styles.image}
                src={gif.url}
                alt={`${index}. ${imageData?.title}`}
                width={targetWidth}
                height={targetHeight}
              />
            </picture>
          </GifOverlay>
        </div>
      </div>
    </div>
  );
}
