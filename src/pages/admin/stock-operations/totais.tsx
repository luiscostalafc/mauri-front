/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
    { name: 'quantidade', selector: 'quantity', sortable: true },
    {
      name: 'produto',
      cell: (row: any) => row?.product?.name && row.product.name
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
            onClick={() => router.push(`/admin/${moduleName}`)}
          >
            Movimentação
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
