import { Metadata } from 'next';
import Layout from '../../components/layout/Layout';
import { getTopSearches } from '../../lib/mongodb/helpers';
import { ReactElement } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // revalidate this page every 60 seconds

export const metadata: Metadata = {
  title: 'GIFcentration 2',
  description: 'The GIF card-matching game! Powered by Giphy',
  // Prevents overscroll on iOS when on-screen keyboard is visible https://bugs.webkit.org/show_bug.cgi?id=176454
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, height=device-height',
};

export default async function Page(): Promise<ReactElement> {
  const topSearches = await getTopSearches();
  return <Layout topSearches={topSearches} />;
}
