/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Flex, Image } from '@chakra-ui/core';
import React from 'react';

const Logo = () => {
  return (
    <Flex justify="flex-start">
      <Image rounded="full" size="100%" src="/liconnection.svg" />
    </Flex>
  );
};

export default Logo;
