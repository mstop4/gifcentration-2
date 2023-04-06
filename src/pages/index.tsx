import { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import GameContainer from '../../components/layout/GameContainer';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home(): ReactElement {
  return (
    <Layout>
      <GameContainer />
    </Layout>
  );
}
