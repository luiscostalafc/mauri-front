import { BoxProps, Text, useColorMode } from '@chakra-ui/core';
import React, { useMemo } from 'react';

const CardHeaderTitle: React.FC<BoxProps> = props => {
  const { colorMode } = useColorMode();

  const color = useMemo(
    () => (colorMode === 'dark' ? 'gray.200' : 'gray.800'),
    [colorMode],
  );

  return <Text fontSize="1.4rem" fontWeight="light" color={color} {...props} />;
};

export default CardHeaderTitle;
