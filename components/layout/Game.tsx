import React from 'react';
import Tableau from '../elements/Tableau';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/layout/Game.module.scss';

const Game: React.FC = () => (
  <Layout>
    <Header />
    <div className={styles.content}>
      <Tableau />
    </div>
    <Footer />
  </Layout>
);

export default Game;
