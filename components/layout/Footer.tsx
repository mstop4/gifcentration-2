import React, { ReactNode } from 'react';
import styles from '@/styles/layout/Footer.module.scss';

type Props = {
  children: ReactNode;
};

const Footer: React.FC = () => <footer className={styles.footer}>2023</footer>;

export default Footer;
