/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ActionButtons from '../../../components/ActionButtons';
import Template from '../../../components/Admin';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';
// import AdminMenu from '../../../components/AdminMenu'

const moduleName = '/api/deliveries';

export default function Index() {
  const [dataVal, setData] = useState([]);
  const fetchData = useCallback(async () => {
    const { data: response } = await api.get(moduleName, { debug: true });
    setData(response);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
  const { addToast } = useToast();
  const msgs: any = {
    inactive: {
      active: 'desativar',
      deactive: 'ativar',
    },
  };
  const updateDelivery = useCallback(async data => {
    try {
      const { ok } = await api.put(`${moduleName}/${data.id}`, data);
      if (ok) {
        addToast(updateToast.success);
        await fetchData();
      } else {
        addToast(updateToast.error);
      }
    } catch (error) {
      console.log(error);
      addToast(updateToast.error);
    }
  }, []);

  const handleDelivery = useCallback(
    async (delivery: any, prop: 'is_provider' | 'inactive' | 'is_admin') => {
      const msg = delivery[prop] ? msgs[prop].active : msgs[prop].deactive;
      delivery[prop] = !delivery[prop];
      if (window.confirm(`Tem certeza que deseja ${msg}?`)) {
        await updateDelivery(delivery);
      }
    },
    [msgs],
  );

  const columns = [
    { title: 'Entrega', field: 'delivery' },
    {
      title: 'Inativo',
      render: ({ tableData, ...row }: any) => (
        <Switch
          checked={row.inactive}
          onClick={() => handleDelivery(row, 'inactive')}
        />
      ),
    },
    {
      title: 'Actions',
      render: (row: { id: number }) => (
        <ActionButtons
          isAdmin
          moduleName="deliveries"
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
    <Template>
      <Button
        typeColor="create"
        onClick={() => router.push(`/admin/${moduleName}/create`)}
      >
        Criar
      </Button>

      <DataTable title="Entregas" columns={columns} data={dataVal} />
    </Template>
  );
}
