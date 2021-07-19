/* eslint-disable no-console */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Switch } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiDelete, FiEdit } from 'react-icons/fi';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast, updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';

interface Toggle {
  id: number
  ['string']: boolean
}
const moduleName = '/api/users';
export default function Index() {
  const [dataVal, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      fetchData()
    }
    getData();
  }, []);

  const fetchData = useCallback(async ()=> {
    const { data: response } = await api.get(moduleName, { debug: true });
    setData(response);
  },[])

  const router = useRouter();
  const { addToast } = useToast();
  const updateUser = useCallback(async (data) => {
    try {
      const { ok } = await api.put(`${moduleName}/${data.id}`, data);
      if (ok) {
        addToast(updateToast.success);
        await fetchData()
      } else {
        addToast(updateToast.error);
      }
    } catch (error) {
      console.log(error)
      addToast(updateToast.error);
    }
  }, [])

  const handleProvider = useCallback(async (user) => {
    const msg = user.is_provider ? 'deixar de ser fornecedor': 'deixar como fornecedor'
    user.is_provider = !user.is_provider
    if(window.confirm(`Tem certeza que deseja ${msg}?`)) {
      await updateUser(user)
    }
  },[])

  const handleActive = useCallback(async (user) => {
    const msg = user.inactive ? 'desativar': 'ativar'
    user.inactive = !user.inactive
    if(window.confirm(`Tem certeza que deseja ${msg}?`)) {
      await updateUser(user)
    }
  },[])

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Username', selector: 'username', sortable: true },
    { name: 'activity', selector: 'activity', sortable: true },
    { name: 'complete_name', selector: 'complete_name', sortable: true },
    { name: 'email', selector: 'email', sortable: true },
    { name: 'rg', selector: 'rg', sortable: true },
    { name: 'cpf_cnpj', selector: 'cpf_cnpj', sortable: true },
    { name: 'nick', selector: 'nick', sortable: true },
    {
      name: 'É fornecedor',
      cell: (row) => (
        <>
          <Switch checked={row.is_provider} onClick={() => handleProvider(row)}/>
        </>
      ),
    },
    {
      name: 'Inativo',
      cell: (row) => (
        <>
          <Switch checked={row.inactive} onClick={() => handleActive(row)}/>
        </>
      ),
    },
    {
      name: 'Ações',
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
