/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Flex, Text } from '@chakra-ui/core';
import Link from 'next/link';
import React, { CSSProperties } from 'react';

const MenuItems: React.FC<CSSProperties> = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

interface MenuItemsInterface {
  label: string
}

const menuItens: MenuItemsInterface[] = [
  { label: 'Garantia' },
  { label: 'Devolução' },
  { label: 'Sobre' },
  { label: 'Orçamento' },
  { label: 'Compras' },
  { label: 'Vendas' },
  { label: 'Rastrear' },
]
const Header = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="flex-end"
        wrap="wrap"
        padding="1.5rem"
        bg="gray.500"
        color="white"
      >
        <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? 'block' : 'none', md: 'none' }}
          width={{ sm: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          flex-wrap="wrap"
        >
          {menuItens.map(({label}) => (<MenuItems>{label}</MenuItems>))}
        </Box>

        <Box
          display={{ sm: show ? 'block' : 'none', md: 'block' }}
          mt={{ base: 4, md: 0 }}
        >
          <Link href="users/profile">
            <Button bg="transparent" border="1px" marginLeft={20}>
              Perfil
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
