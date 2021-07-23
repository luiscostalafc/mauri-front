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
import DataTable from 'react-data-table-component';
import { FiDelete, FiEdit } from 'react-icons/fi';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast, updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API/index';

const moduleName = '/api/products';

export default function Index() {
  const [dataVal, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      fetchData()
    }
    getData();
  }, []);

  const router = useRouter();
  const { addToast } = useToast();
  const fetchData = useCallback(async ()=> {
    const { data: response } = await api.get(moduleName);
    setData(response);
  },[])

  const updateProduct = useCallback(async (data) => {
    const { group, subgroup, ...rest } = data

    try {
      const { ok } = await api.put(`${moduleName}/${data.id}`, rest);
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

  const handleActive = useCallback(async (product) => {
    const msg = product.inactive ? 'desativar': 'ativar'
    product.inactive = !product.inactive
    if(window.confirm(`Tem certeza que deseja ${msg}?`)) {
      await updateProduct(product)
    }
  },[])

  const columns = [
    { name: 'grupo', cell: (row) => (row?.group?.group ?? "não encontrado") },
    { name: 'subgroupo', cell: (row) => (row?.subgroup?.subgroup ?? "não encontrado") },
    { name: 'montadora', selector: 'automaker', sortable: true },
    { name: 'modelo', selector: 'model', sortable: true },
    // { name: 'year_start', selector: 'year_start', sortable: true },
    // { name: 'year_end', selector: 'year_end', sortable: true },
    { name: 'motor', selector: 'engine', sortable: true },
    // { name: 'complement', selector: 'complement', sortable: true },
    // { name: 'quantity_used', selector: 'quantity_used', sortable: true },
    // { name: 'quantity_package', selector: 'quantity_package', sortable: true },
    // { name: 'size', selector: 'size', sortable: true },
    // { name: 'height', selector: 'height', sortable: true },
    // { name: 'width', selector: 'width', sortable: true },
    // { name: 'lenth', selector: 'lenth', sortable: true },
    // { name: 'weight', selector: 'weight', sortable: true },
    // { name: 'inner_diameter', selector: 'inner_diameter', sortable: true },
    // {
    //   name: 'external_diameter',
    //   selector: 'external_diameter',
    //   sortable: true,
    // },
    { name: 'título', selector: 'title', sortable: true },
    { name: 'nome', selector: 'name', sortable: true },
    { name: 'tipo', selector: 'type', sortable: true },
    { name: 'posição', selector: 'position', sortable: true },
    { name: 'sistema', selector: 'system', sortable: true },
    // { name: 'color', selector: 'color', sortable: true },
    // { name: 'material', selector: 'material', sortable: true },
    { name: 'obs', selector: 'obs', sortable: true },
    {
      name: 'Inativo',
      cell: (row) => (
        <>
          <Switch checked={row.inactive} onClick={() => handleActive(row)}/>
        </>
      ),
    },
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
            style={{ marginLeft: 5 }}
            typeColor="delete"
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
        </>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
