import React, { ReactElement } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestion } from '@fortawesome/free-solid-svg-icons';
// import { Measures, useMeasure } from '@react-hookz/web';
// import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import styles from '@/styles/elements/Card2.module.scss';
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
    <div className={styles.parent}>
      <div className={styles.child}>
        <img src="https://media0.giphy.com/media/Kxy2YUDnDrvdxVsVb8/200w.webp?cid=e0260b372a2e9589f6944b6831df32cff0aeb50fa5e9afa0&rid=200w.webp&ct=g" />
      </div>
    </div>
  );
}
