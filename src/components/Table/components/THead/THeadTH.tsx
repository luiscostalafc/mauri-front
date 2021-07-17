/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, useColorMode } from '@chakra-ui/core';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { cell } from '../../modules/styles';

const Wrapper = styled('th')`
  ${cell};
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }: any) => theme.fontSizes.sm};
  color: ${({ theme }: any) => theme.colors.gray[800]};
`;

const THeadTH: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();

  const color = useMemo(
    () => (colorMode === 'dark' ? 'gray.400' : 'gray.500'),
    [colorMode],
  );

  return (
    <Wrapper>
      <Text color="#000">{children}</Text>
    </Wrapper>
  );
};

export default THeadTH;
