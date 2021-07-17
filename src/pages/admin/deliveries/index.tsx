/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ActionButtons from '../../../components/ActionButtons';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';
// import AdminMenu from '../../../components/AdminMenu'

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
      maxWidht: '100vh',
      paddingLeft: '10px', // override the cell padding for data cells
      paddingRight: '10px',
    },
  },
};

const moduleName = '/api/deliveries';
// export async function getStaticProps() {
//   const { data } = await api.get(moduleName, { debug: true });
//   console.log(`🚀  get ${moduleName} data!`);

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// }

// export default function Index({ data }: any) {
export default function Index() {
  const [dataVal, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data: response } = await api.get(moduleName, { debug: true });
      setData(response);
    }
    getData();
  }, []);

  // const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { addToast } = useToast();

  const columns = [
    { name: 'Entrega', selector: 'delivery', sortable: true },
    {
      name: 'Inactivo',
      selector: 'inactive',
      cell: (row: any) => (row.inactive ? 'Sim' : 'Não'),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <ActionButtons
          moduleName={moduleName}
          row={row}
          onDelete={reloadData}
        />
      ),
    },
  ];

  async function reloadData(isDeleted: boolean) {
    if (isDeleted) {
      const { data: state } = await api.get(moduleName);
      setData(state);
    }
  }

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

          <DataTable
            title="Entregas"
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
