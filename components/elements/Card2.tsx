import React, { ReactElement } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestion } from '@fortawesome/free-solid-svg-icons';
// import { Measures, useMeasure } from '@react-hookz/web';
// import { SizeProp } from '@fortawesome/fontawesome-svg-core';
// import styles from '@/styles/elements/Card2.module.scss';
import { Gif } from '@giphy/react-components';
// import { GameState } from '../layout/Game';
import { IGif } from '@giphy/js-types';
import mockGif from '../../mockData/IGif.json';

// export type CardProps = {
//   gameState: GameState;
//   index: number;
//   imageData: IGif;
//   flipped: boolean;
//   active: boolean;
//   matched: boolean;
//   handleCardClick: (index: number) => void;
//   updateImageLoaded: (index: number) => void;
// };

// const defaultSize = 100;
// const gifSizeScale = 0.9;

export default function Card2(): ReactElement {
  return (
    <div>
      <Gif
        gif={mockGif as unknown as IGif}
        width={200}
        height={200}
        hideAttribution={true}
        noLink={true}
        onGifSeen={() => {
          console.log('foo');
        }}
      />
    </div>
  );
}
