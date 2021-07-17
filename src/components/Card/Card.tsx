import { Box, BoxProps, useColorMode } from '@chakra-ui/core';
import React, { useMemo } from 'react';
import CardBody from './components/CardBody';
import CardHeader from './components/CardHeader/CardHeader';

type Props = BoxProps;

type CommonComponents = {
  Header: typeof CardHeader;
  Body: typeof CardBody;
};

const Card: React.FC<Props> & CommonComponents = props => {
  const { colorMode } = useColorMode();

  const bg = useMemo(() => (colorMode === 'dark' ? 'gray.700' : 'white'), [
    colorMode,
  ]);

  return <Box bg={bg} borderRadius={4} borderWidth={1} {...props} />;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
