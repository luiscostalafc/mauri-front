/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useRef, useState } from 'react';
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import Template from '../../../components/Admin';
import AdminMenu from '../../../components/Admin/Menu';
import Bread from '../../../components/Breadcrumb';
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';

import { checkExtension, sheetToJson } from '../../../utils/uploadExcel';

const moduleName = 'products/excel';
export default function Excel() {
  const formRef = useRef<FormHandles>(null);
  const [excel, setExcel] = useState();
  const [loading, setLoading] = useState(false);
  const [canImport, setCanImport] = useState(false);
  const { addToast } = useToast();

  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>();

  const handleSubmit = useCallback(async () => {
    if (!excel) {
      addToast({
        type: 'info',
        title: 'Erro',
        description: 'Arquivo excel é obrigatório',
      });
      return;
    }

    if (!loading) {
      setLoading(true);
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/products/excel`, {
      method: 'post',
      body: JSON.stringify({ data: excel }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoading(false);
    if (!data.ok) {
      addToast(updateToast.error);
      return;
    }
    addToast(updateToast.success);
    router.push(`/admin/${moduleName}`);
  }, [excel, loading, addToast, router]);

  const handleInput = async (e: any) => {
    const file = e.target.files[0];
    const validExtension = checkExtension(file);
    if (!validExtension) {
      const msg = 'Extenção inválida! deve ser: csv, ods, xlsx, xls';
      addToast({
        ...updateToast.error,
        description: msg,
      });
      return;
    }
    const parsedData = await sheetToJson(file);
    setCanImport(true);
    setExcel(parsedData as any);
  };

  const breads = [
    { href: 'products', label: 'Produtos lista' },
    { href: '#', label: 'Produtos criar' },
  ];
  return (
    <Template slider={<AdminMenu />} group={<></>}>
      <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads} />
        <Heading size="md">Upload de produtos via Excel</Heading>
        {loading ? (
          <Spinner
            marginTop="20px"
            width="50px"
            height="50px"
            color="#ED8936"
          />
        ) : (
          <Flex flexDir="column">
            <CustomInput
              ref={inputFileRef}
              name="excel"
              placeholder="Excel"
              type="file"
              onChange={handleInput}
            />

            <Button
              type="submit"
              disabled={!canImport}
              bg="#68d391"
              w={346}
              h={48}
              mt={8}
              borderRadius={12}
              textTransform="uppercase"
              title={canImport ? 'Enviar' : 'Selecione um arquivo válido'}
              style={{ transition: 'all .2s ease' }}
              _hover={{ backgroundColor: canImport ? '#ff9000' : '#68d391' }}
            >
              Inserir
            </Button>
          </Flex>
        )}
      </Form>
    </Template>
  );
}

const CustomInput = styled.input`
  background-color: #a0aec0;
  padding: 20px;
  border-radius: 12px;
  width: 346px;
`;
