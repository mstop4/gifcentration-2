import React, { ReactNode } from 'react';
import styles from '@/styles/layout/Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = props => (
  <main className={styles.main}>{props.children}</main>
);

export default Layout;
