import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
