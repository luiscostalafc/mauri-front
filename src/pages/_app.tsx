/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ThemeContainer from '../contexts/theme/ThemeContainer';
import AppProvider from '../hooks';
import GlobalStyle from '../styles/global';

Router.events.on('routeChangeStart', () => {
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeContainer>
      <CookiesProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </CookiesProvider>
      <GlobalStyle />
    </ThemeContainer>
  );
};

export default MyApp;
