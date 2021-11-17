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
import { isUserAdmin } from '../services/auth';
import GlobalStyle from '../styles/global';

const PRIVATE_ROUTE_PREFIX = "admin"
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('beforeHistoryChange', (route: string) => {
  if (route.includes(PRIVATE_ROUTE_PREFIX) && !isUserAdmin()) {
    Router.events.emit('routeChangeError')
    throw 'user is not admin'
  }
});

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
