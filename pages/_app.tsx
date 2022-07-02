import '../styles/globals.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false
});
