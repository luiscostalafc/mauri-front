import { Button, ButtonGroup, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string;
  marginLeft?: number;
  route: string;
  label: string;
}
const options: Option[] = [
  { variantColor: 'green', route: '/admin/products', label: 'Produtos' },
  {
    variantColor: 'yellow',
    marginLeft: 0.5,
    route: '/admin/stock-operations',
    label: 'Estoque',
  },
  {
    variantColor: 'blue',
    marginLeft: 0.5,
    route: '/admin/users',
    label: 'Usuários',
  },
];

const AdminLeftMenu: React.FC = props => {
  const router = useRouter();

  return (
    <Flex>
      <ButtonGroup spacing={4}>
        {options.map(({ variantColor, marginLeft, route, label }, index) => (
          <Link href={route} key={index}>
            <Button
              size="xs"
              leftIcon={FaCartArrowDown}
              variantColor={variantColor}
              variant="solid"
              marginLeft={marginLeft ?? 0}
              onClick={() => {
                router.push(route);
              }}
              {...props}
            >
              {label}
            </Button>
          </Link>
        ))}
      </ButtonGroup>
    </Flex>
  );
};

export default AdminLeftMenu;
