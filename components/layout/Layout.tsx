'use client';

import { ReactElement, useState } from 'react';
import Game, { GameProps } from '../game/Game';
import styles from '@/styles/layout/Layout.module.scss';
import { useMountEffect } from '@react-hookz/web';
import Loading from '../elements/ui/MainLoadingIndicator';

export default function Layout(props: GameProps): ReactElement {
  const [isLoading, setIsLoading] = useState(true);

  useMountEffect(() => {
    setIsLoading(false);
  });

  return (
    <main id={styles.main}>
      {isLoading ? <Loading /> : <Game topSearches={props.topSearches} />}
    </main>
  );
}
