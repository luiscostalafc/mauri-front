
import { Switch } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import ActionButtons from '../../../components/ActionButtons';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import Template from '../../../components/Template';
import { updateToast } from '../../../config/toastMessages';
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

  const msgs = {
    is_provider: {
      active: 'deixar de ser fornecedor',
      deactive: 'deixar como fornecedor'
    },
    inactive: {
      active: 'desativar',
      deactive: 'ativar'
    },
    is_admin: {
      active: 'deixar de ser administrador',
      deactive: 'tornar administrador'
    }
  }

  const handleUser = useCallback(async (user: any, prop: 'is_provider' | 'inactive' | 'is_admin') => {
    const msg = user[prop] ? msgs[prop].active: msgs[prop].deactive
    console.log({user})
    user[prop] = !user[prop]
    if(window.confirm(`Tem certeza que deseja ${msg}?`)) {
      await updateUser(user)
    }
  },[msgs])

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' },
    { title: 'activity', field: 'activity' },
    { title: 'complete_name', field: 'complete_name' },
    { title: 'email', field: 'email' },
    { title: 'rg', field: 'rg' },
    { title: 'cpf_cnpj', field: 'cpf_cnpj' },
    { title: 'nick', field: 'nick' },
    {
      title: 'É fornecedor',
      render: ({tableData, ...row}: any) => (<Switch checked={row.is_provider} onClick={() => handleUser(row, "is_provider")}/>),
    },
    {
      title: 'Inativo',
      render: ({tableData, ...row}: any) => (<Switch checked={row.inactive} onClick={() => handleUser(row, "inactive")}/>),
    },
    {
      title: 'Administrador',
      render: ({tableData, ...row}: any) => (<Switch checked={row.is_admin} onClick={() => handleUser(row, "is_admin")}/>),
    },
    {
      name: 'Ações',
      render: (row: { id: number }) => <ActionButtons
        row={row}
        onDelete={(state) => setData(state)}
        moduleName="users" 
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
          <DataTable
            title="Usuários"
            columns={columns}
            data={dataVal}
          />
        </>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
