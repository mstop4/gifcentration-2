import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <p>Lorem ipsum</p>
    </Layout>
  );
}
