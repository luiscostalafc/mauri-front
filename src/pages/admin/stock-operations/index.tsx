import { Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ActionButtons from '../../../components/ActionButtons';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import Template from '../../../components/Template';
import { api } from '../../../services/API/index';

const moduleName = 'stock-operations';

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
    {
      title: 'operação',
      render: (row: any) => row?.operation?.operation && <Text color={row.operation.operation == "Entrada" ? "green" : 'tomato'}>{row.operation.operation}</Text>
    },
    { title: 'quantidade', field: 'quantity' },
    {
      title: 'valor unitário',
      render: (row: { unit_value: number }) => row?.unit_value && `R$ ${row.unit_value}`
    },
    { title: 'comentário', field: 'comment' },
    {
      title: 'produto',
      render: (row: any) => row?.product?.name && row.product.name
    },
    {
      title: 'Actions',
      render: (row: { id: number }) => <ActionButtons
      row={row}
      moduleName="stock-operations"
      noDelete
      isAdmin
      />,
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
            onClick={() => router.push(`/admin/stocks`)}
          >
            Ver Totais
          </Button>
          <DataTable
            title="Movimentação de produtos"
            columns={columns}
            data={dataVal}
          />
        </>
      }
    />
  );
}
