import { ReactElement } from 'react';
import Game from '../../components/layout/Game';
import { GetServerSideProps } from 'next';
import giphyFetch from '../../lib/giphySDK';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await giphyFetch.gif('Kxy2YUDnDrvdxVsVb8');
  return {
    props: {
      gif: data,
    },
  };
};

export default function Home(): ReactElement {
  return <Game />;
}
