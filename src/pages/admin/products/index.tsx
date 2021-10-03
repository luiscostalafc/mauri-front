/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Switch } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import ActionButtons from '../../../components/ActionButtons';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { deletionToast, updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';

const moduleName = '/api/products';

export default function Index() {
  const [dataVal, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      fetchData();
    }
    getData();
  }, []);

  const router = useRouter();
  const { addToast } = useToast();
  const fetchData = useCallback(async () => {
    const { data: response } = await api.get(moduleName);
    setData(response);
  }, []);

  const updateProduct = useCallback(async data => {
    const { group, subgroup, ...rest } = data;

    try {
      const { ok } = await api.put(`${moduleName}/${data.id}`, rest);
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

  const handleActive = useCallback(async product => {
    const msg = product.inactive ? 'desativar' : 'ativar';
    product.inactive = !product.inactive;
    if (window.confirm(`Tem certeza que deseja ${msg}?`)) {
      await updateProduct(product);
    }
  }, []);

  const columns = [
    {
      title: 'grupo',
      render: (row: any) => row?.group?.group ?? 'não encontrado',
    },
    {
      title: 'subgroupo',
      render: (row: any) => row?.subgroup?.subgroup ?? 'não encontrado',
    },
    { title: 'montadora', field: 'automaker' },
    { title: 'modelo', field: 'model' },
    // { title: 'year_start', field: 'year_start' },
    // { title: 'year_end', field: 'year_end' },
    { title: 'motor', field: 'engine' },
    // { title: 'complement', field: 'complement' },
    // { title: 'quantity_used', field: 'quantity_used' },
    // { title: 'quantity_package', field: 'quantity_package' },
    // { title: 'size', field: 'size' },
    // { title: 'height', field: 'height' },
    // { title: 'width', field: 'width' },
    // { title: 'lenth', field: 'lenth' },
    // { title: 'weight', field: 'weight' },
    // { title: 'inner_diameter', field: 'inner_diameter' },
    // {
    //   title: 'external_diameter',
    //   field: 'external_diameter',
    //   sortable: true,
    // },
    { title: 'título', field: 'title' },
    { title: 'nome', field: 'name' },
    { title: 'tipo', field: 'type' },
    { title: 'posição', field: 'position' },
    { title: 'sistema', field: 'system' },
    // { title: 'color', field: 'color' },
    // { title: 'material', field: 'material' },
    { title: 'obs', field: 'obs' },
    {
      title: 'Inativo',
      render: (row: any) => (
        <>
          <Switch checked={row.inactive} onClick={() => handleActive(row)} />
        </>
      ),
    },
    {
      title: 'Actions',
      render: (row: { id: number }) => (
        <ActionButtons
          row={row}
          onDelete={state => setData(state)}
          moduleName="products"
          isAdmin
        />
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
    <Template slider={<AdminMenu />} group={<></>}>
      <Button
        typeColor="create"
        onClick={() => router.push(`/admin/${moduleName}/create`)}
      >
        Criar
      </Button>
      <Button
        typeColor="create"
        onClick={() => router.push(`/admin/${moduleName}/excel`)}
      >
        Inserção via Excel
      </Button>
      <DataTable
        title="Produtos"
        columns={columns}
        data={dataVal}
        pagination
        highlightOnHover
        striped
        fixedHeader
        responsive
      />
    </Template>
  );
}
