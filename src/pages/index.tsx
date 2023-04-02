import Image from 'next/image';
import Layout from '../../components/Layout';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <p>Lorem ipsum</p>
    </Layout>
  );
}
