import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import AdminLeftMenu from '../../../components/Admin/LeftMenu';
import Header from '../../../components/Header';
import AdminRightMenu from '../../../components/Admin/RightMenu';
import api from '../../../services/api';
import {
  SessionDescricao,
  SessionAplicacoes,
  SessionEspecificacoes,
  SessionFornecedores,
} from '../../../components/Product/CreatePage';

export type Field = {
  name: string;
  type: string;
  label: string;
  values?: {
    option: string;
    value: number | string;
  }[];
};

export default function Create(): React.ReactNode {
  const methods = useForm({});
  const {
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormsubmit = useCallback(async data => {
    console.log(data);
    // const res = await api.post('/api/products', data);
  }, []);

  return (
    <>
      <Flex justify="space-between" alignItems="center" h={80} mb={16} px={12}>
        <AdminLeftMenu />
        <Header />
        <AdminRightMenu />
      </Flex>
      <Box p={20}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormsubmit)}>
            <FormControl>
              <SessionDescricao />
              <SessionEspecificacoes />
              <SessionAplicacoes control={control} />
              <SessionFornecedores control={control} />
              <FormErrorMessage>{errors}</FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              variant="solid"
              bg="teal"
              px={12}
              py={2}
              borderRadius={8}
              ml={12}
              color="#FFF"
            >
              Salvar
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
}
