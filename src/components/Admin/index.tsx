/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Flex, Grid, Image } from '@chakra-ui/core';
import React from 'react';
import Header from '../Header/index';
import AdminLeftMenu from './LeftMenu/index';
import AdminRightMenu from './RightMenu';

declare interface TemplateInterface {
  logo?: JSX.Element;
  header?: JSX.Element;
  logoR?: JSX.Element;
  menuL?: JSX.Element;
  filter?: JSX.Element;
  menuR?: JSX.Element;
  slider?: JSX.Element;
  group?: JSX.Element;
  footer?: JSX.Element;
  children?: JSX.Element[] | any;
  content?: any;
  flexDir?: 'row' | 'column';
}
export default function Template({
  logo,
  header,
  logoR,
  menuL,
  filter,
  menuR,
  slider,
  group,
  footer,
  children,
  flexDir = 'row',
}: TemplateInterface) {
  return (
    <Grid
      as="main"
      height="100vh"
      width="100vh"
      templateColumns="100% 50% 100% 50%"
      templateRows="200px 50px auto 0px"
      templateAreas="
    '. logoL header logoR'
    '. menuL . menuR'
    '.  content content content'
    '. . . .'
    "
      justifyContent="center"
      justifyItems="center"
    >
      <Flex gridArea="logoL" alignItems="flex-start" justify="center">
        {logo || (
          <Image size="70%" src="/liconnection.svg" alt="Liconnection" />
        )}
      </Flex>

      <Flex
        gridArea="header"
        flexDir="row"
        alignItems="flex-start"
        width={{ sm: '68%', md: '100%' }}
      >
        {header || <Header />}
      </Flex>

      <Flex gridArea="logoR" alignItems="flex-start" justify="center">
        {logoR || (
          <Image size="70%" src="/liconnection.svg" alt="Liconnection" />
        )}
      </Flex>

      <Flex
        marginTop={-8}
        gridArea="menuL"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {menuL || <AdminLeftMenu />}
      </Flex>

      <Flex
        marginTop={-8}
        gridArea="menuR"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {menuR || <AdminRightMenu />}
      </Flex>

      <Flex
        gridArea="content"
        flexDir={flexDir}
        alignItems="flex-center"
        width="90%"
        wrap="wrap"
      >
        {children}
      </Flex>
    </Grid>
  );
}
