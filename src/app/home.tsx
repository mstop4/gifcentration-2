import Game from '../../components/layout/Game';
import { getTopSearches } from '../../lib/mongodb/helpers';
import type { ReactElement } from 'react';

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Home(): Promise<ReactElement> {
  const topSearches = await getTopSearches();
  return <Game topSearches={topSearches} />;
}
