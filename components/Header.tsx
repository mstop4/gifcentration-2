import React, { ReactNode } from 'react';
import styles from '@/styles/Header.module.scss';

type Props = {
  children: ReactNode;
};

const Header: React.FC = () => (
  <header className={styles.header}>GIFcentration 2</header>
);

export default Header;
