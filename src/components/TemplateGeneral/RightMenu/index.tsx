import { Button, ButtonGroup, Flex, Heading, Box } from '@chakra-ui/core';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string;
  label: string;
}
const options: Option[] = [
  { variantColor: 'green', label: 'Orçamento' },
  { variantColor: 'yellow', label: 'Compras' },
  { variantColor: 'blue', label: 'Vendas' },
];

const RightMenu: React.FC = () => {
  const [isLargerThan1015] = useMediaQuery('(min-width:1015px)');

  return (
    <Flex flexDirection="column" alignItems="center" mt={4}>
      <Flex mt={2} flexDir={isLargerThan1015 ? 'row' : 'column'}>
        {options.map(({ variantColor, label }) => (
          <Button
            padding={{ xl: '5px' }}
            width="85px"
            height="30px"
            variantColor={variantColor}
            marginLeft={2}
            variant="solid"
            mt={isLargerThan1015 ? 0 : 1}
          >
            <Heading fontSize={12} ml="4px">
              {label}
            </Heading>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default RightMenu;
