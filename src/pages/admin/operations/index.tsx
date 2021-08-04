import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ActionButtons from '../../../components/ActionButtons';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { deletionToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';

const moduleName = '/api/operations';
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
    {
      title: 'Operation',
      field: 'operation',
    },
    {
      title: 'Actions',
      render: (row: { id: number }) => <ActionButtons
        row={row}
        onDelete={(state) => setData(state)}
        moduleName="operations" 
        isAdmin
      />,
    },
  ];

  async function remove(id: number | string) {
    if (confirm('Você tem certeza?')) {
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
            title="Operações"
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
