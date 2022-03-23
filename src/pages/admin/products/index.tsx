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
    { title: 'Montadora', field: 'automaker' },
    { title: 'Modelo', field: 'model' },
    { title: 'Ano Modelo de', field: 'year_start' },
    { title: 'Ano Modelo até', field: 'year_end' },
    { title: 'Motor', field: 'engine' },
    { title: 'Complemento', field: 'complement' },
    { title: 'Quantidade De Uso', field: 'quantity_used' },
    { title: 'Embalagem de Venda', field: 'quantity_package' },
    { title: 'Tamanho', field: 'size' },
    { title: 'Altura (cm)', field: 'height' },
    { title: 'Largura (cm)', field: 'width' },
    { title: 'Comprimento (cm)', field: 'lenth' },
    { title: 'Peso', field: 'weight' },
    { title: 'Diametro Interno (mm)', field: 'inner_diameter' },
    {
      title: 'Diâmetro Externo (mm)',
      field: 'external_diameter',
      sortable: true,
    },
    { title: 'Título', field: 'title' },
    { title: 'Nome', field: 'name' },
    { title: 'Tipo', field: 'type' },
    { title: 'Posição', field: 'position' },
    { title: 'Sistema', field: 'system' },
    { title: 'Cor', field: 'color' },
    { title: 'Material', field: 'material' },
    { title: 'Observação', field: 'obs' },
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
        onClick={() => router.push(`/admin/products/excel`)}
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
