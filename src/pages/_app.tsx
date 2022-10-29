/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'regenerator-runtime/runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import ThemeContainer from '../contexts/theme/ThemeContainer';
import AppProvider from '../hooks';
import { isUserAdmin } from '../services/auth';
import GlobalStyle from '../styles/global';

const PRIVATE_ROUTE_PREFIX = 'admin';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const ngStart = () => NProgress.start();
  const ngDone = () => NProgress.done();
  const beforeHistoryChange = (route: string) => {
    if (route.includes(PRIVATE_ROUTE_PREFIX) && !isUserAdmin()) {
      Router.events.emit('routeChangeError');
      console.error('Você não tem permissão para acessar esta rota!');
    }
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', ngStart);
    Router.events.on('routeChangeComplete', ngDone);
    Router.events.on('routeChangeError', ngDone);
    Router.events.on('beforeHistoryChange', beforeHistoryChange);

    return () => {
      Router.events.off('routeChangeStart', ngStart);
      Router.events.off('routeChangeComplete', ngDone);
      Router.events.off('routeChangeError', ngDone);
      Router.events.off('beforeHistoryChange', beforeHistoryChange);
    };
  }, []);
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
