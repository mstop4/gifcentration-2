import { ReactElement } from 'react';
import Game from '../../components/layout/Game';
import { GetServerSideProps } from 'next';
import giphyFetch from '../../lib/giphySDK';
import { IGif } from '@giphy/js-types';

export type HomeProps = {
  gif: IGif;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await giphyFetch.gif('Kxy2YUDnDrvdxVsVb8');
  console.log('Data: ', data);
  return {
    props: {
      gif: data,
    },
  };
};

export default function Home(props: HomeProps): ReactElement {
  return <Game gif={props.gif} />;
}
