/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { api } from '../../../services/API/index';

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '10px', // override the cell padding for data cells
      paddingRight: '10px',
    },
  },
};

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
    { name: 'qualidade', selector: 'quality', sortable: true },
    {
      name: 'quantidade',
      cell: (row: any) => <Text color={row.quantity > row.min_alert ? "green" : 'tomato'}>{row.quantity}</Text>
    },
    { name: 'quantidade min.', selector: 'min_alert', sortable: true },
    {
      name: 'usuário',
      cell: (row: any) => row?.user?.name && row.user.name
    },
    {
      name: 'produto',
      cell: (row: any) => row?.product?.name && row.product.name
    },
    {
      name: 'tipo de estoque',
      cell: (row: any) => row?.stockType?.stock_type && row.stockType.stock_type
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
            pagination
            highlightOnHover
            striped
            fixedHeader
            customStyles={customStyles}
          />
        </>
      }
    />
  );
}
