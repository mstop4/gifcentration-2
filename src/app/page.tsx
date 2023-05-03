import { Metadata } from 'next';
import Game from '../../components/layout/Game';
import { getTopSearches } from '../../lib/mongodb/helpers';
import type { ReactElement } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // revalidate this page every 60 seconds

export const metadata: Metadata = {
  title: 'GIFcentration 2',
  description: 'Card-matching game powered by Giphy',
  // Prevents overscroll on iOS when on-screen keyboard is visible https://bugs.webkit.org/show_bug.cgi?id=176454
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, height=device-height',
};

export default async function Page(): Promise<ReactElement> {
  const topSearches = await getTopSearches();
  console.log('Top Searches:');
  console.log(topSearches);
  // Next.js does accept async server components, despite what the linter expects
  return <Game topSearches={topSearches} />;
}
