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
import { FiDelete, FiEdit } from 'react-icons/fi';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';

const moduleName = '/api/users';
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

  const router = useRouter();
  const { addToast } = useToast();

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Username', selector: 'username', sortable: true },
    { name: 'activity', selector: 'activity', sortable: true },
    { name: 'complete_name', selector: 'complete_name', sortable: true },
    { name: 'email', selector: 'email', sortable: true },
    { name: 'rg', selector: 'rg', sortable: true },
    { name: 'cpf_cnpj', selector: 'cpf_cnpj', sortable: true },
    { name: 'nick', selector: 'nick', sortable: true },
    { name: 'is_provider', selector: 'is_provider', sortable: true },
    { name: 'inactive', selector: 'inactive', sortable: true },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Button
            typeColor="edit"
            onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}
          >
            <FiEdit />
          </Button>
          <Button
            typeColor="delete"
            style={{ marginLeft: 5 }}
            onClick={() => remove(row.id)}
          >
            <FiDelete />
          </Button>
        </>
      ),
    },
  ];

  async function remove(id: number | string) {
    if (confirm('Are you sure?')) {
      const { ok } = await api.delete(`${moduleName}/${id}`);
      if (ok) {
        const { data: state } = await api.get(moduleName);
        addToast(deletionToast.success);
        setData(state);
      } else {
        addToast(deletionToast.error);
      }
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
            title="Usuários"
            columns={columns}
            data={dataVal}
            pagination
            highlightOnHover
            striped
            fixedHeader
            responsive
          />
        </>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
