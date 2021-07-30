import { Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import Template from '../../../components/Template';
import { api } from '../../../services/API/index';

const moduleName = 'stock';

export default function Index() {
  const [dataVal, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data: response } = await api.get(`/api/${moduleName}`, { debug: true });
      setData(response);
    }
    getData();
  }, []);

  const router = useRouter();

  const columns = [
    { title: 'qualidade', selector: 'quality' },
    {
      title: 'quantidade',
      render: (row: any) => <Text color={row.quantity > row.min_alert ? "green" : 'tomato'}>{row.quantity}</Text>
    },
    { title: 'quantidade min.', selector: 'min_alert' },
    {
      title: 'usuário',
      render: (row: any) => row?.user?.name && row.user.name
    },
    {
      title: 'produto',
      render: (row: any) => row?.product?.name && row.product.name
    },
    {
      title: 'tipo de estoque',
      render: (row: any) => row?.stockType?.stock_type && row.stockType.stock_type
    },
  ];

  return (
    <Template
      content={
        <>
          <Button
            typeColor="create"
            onClick={() => router.push(`/admin/${moduleName}/create`)}
          >
            Criar
          </Button>
          <Button
            typeColor="create"
            onClick={() => router.push(`/admin/stock-operations`)}
          >
            Ver Movimentação
          </Button>
          <DataTable
            title="Estoque de Produtos"
            columns={columns}
            data={dataVal}
          />
        </>
      }
    />
  );
}
