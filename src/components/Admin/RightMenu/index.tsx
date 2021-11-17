/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

const AdminRightMenu: React.FC = (props: any) => {
  const router = useRouter();

  return (
    <ButtonGroup spacing={4}>
      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="green"
        variant="solid"
        onClick={() => {
          router.push('/admin/deliveries');
        }}
        {...props}
      >
        Entregas
      </Button>

      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="yellow"
        variant="solid"
        marginLeft={0.5}
        onClick={() => {
          router.push('/admin/operations');
        }}
        {...props}
      >
        Operações
      </Button>

      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="blue"
        variant="solid"
        marginLeft={0.5}
        marginRight={2}
        onClick={() => {
          router.push('/admin/orders');
        }}
        {...props}
      >
        Pedidos
      </Button>
    </ButtonGroup>
  );
};

export default AdminRightMenu;
