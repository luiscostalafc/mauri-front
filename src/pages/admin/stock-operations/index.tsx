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
      name: 'operação',
      cell: (row: any) => row?.operation?.operation && <Text color={row.operation.operation == "Entrada" ? "green" : 'tomato'}>{row.operation.operation}</Text>
    },
    { name: 'quantidade', selector: 'quantity', sortable: true },
    {
      name: 'valor unitário',
      cell: (row: { unit_value: number }) => row?.unit_value && `R$ ${row.unit_value}`
    },
    { name: 'comentário', selector: 'comment', sortable: true },
    {
      name: 'produto',
      cell: (row: any) => row?.product?.name && row.product.name
    },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Button
            typeColor="edit"
            onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}
          >
            Editar
          </Button>
        </>
      ),
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
