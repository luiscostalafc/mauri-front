import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminPageLayout } from '../../../components/Admin/AdminPageLayout';
import { ReactTable } from '../../../components/ReactTable/ReactTable';
import LeftMenu from '../../../components/TemplateGeneral/LeftMenu';
import RightMenu from '../../../components/TemplateGeneral/RightMenu';
import api from '../../../services/api';

const moduleName = '/api/products';

export default function Index({ products }): JSX.Element {

  if(!products.length ) return (
    <div>
      <AdminPageLayout rightLayout={{marginTop: '100px'}}>

      <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h3>
          Nenhum produto encontrado
        </h3>
        <Link href="/admin/products/create">
          <Button mt={12} bg="green" py={6} px={16} color="#FFF" borderRadius={8}>Criar</Button>
        </Link>
        <Link href="/admin/products/excel">
          <Button mt={12} bg="green" py={6} px={16} color="#FFF" borderRadius={8}>Importar</Button>
        </Link>
      </div>
      </AdminPageLayout>
    </div>
  )


  return (
    <ReactTable products={products} /> 
  );
}


export const getServerSideProps:GetServerSideProps = async (props) => {
  const {data: products} = await api.get(moduleName)
  console.log(products)
  return {
    props:{
      products
    }
  }
}