/* eslint-disable no-console */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import DashboardAdminButtons from '../../../components/DashboardAdminButtons';
import DashboardAdminTable from '../../../components/DashboardAdminTable';
import Template from '../../../components/Template';
// import { get } from '../../../services/API';
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

// export default function Index({ data }: never) {
export default function Index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data: response } = await api.get(moduleName, { debug: true });
      setData(response);
    }
    getData();
  }, []);

  const columns = [
    { name: 'Pedido (data/hs)', selector: 'name', sortable: true },
    { name: 'Faturado (data/hs)', selector: 'username', sortable: true },
    { name: 'Nº Pedido', selector: 'activity', sortable: true },
    { name: 'Cliente', selector: 'complete_name', sortable: true },
    { name: 'Forma de Envio', selector: 'email', sortable: true },
    { name: 'Fornecedor', selector: 'rg', sortable: true },
    { name: 'SKU Código Fornecedor', selector: 'cpf_cnpj', sortable: true },
    { name: 'Marca', selector: 'nick', sortable: true },
    { name: 'MPM Código Marca', selector: 'is_provider', sortable: true },
    { name: 'Qte Vendida', selector: 'inactive', sortable: true },
    { name: 'Preço Venda', selector: 'inactive', sortable: true },
    { name: 'Preço Custo', selector: 'inactive', sortable: true },
    { name: 'Margem', selector: 'inactive', sortable: true },
    {
      name: 'Descrição título do produto',
      selector: 'inactive',
      sortable: true,
    },
  ];

  return (
    <Template>
      <DashboardAdminButtons />
      <DashboardAdminTable
        data={data}
        columns={columns}
        title="Painel Administrativo - Canceladas"
      />
    </Template>
  );
}
