import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
import { useToast } from '../../../hooks/toast';
import { useRouter } from 'next/router';
import * as yup from 'yup';

const dataSchema = yup.object({
  altura: yup.string().required(),
  comprimento: yup.string().required(),
  condicoes_mlb: yup.string().required(),
  cor: yup.string().required(),
  desativado: yup.string().required(),
  detalhes_ficha_tecnica_mlb: yup.string().required(),
  diametro_externo: yup.string().required(),
  diametro_interno: yup.string().required(),
  espessura: yup.string().required(),
  grupo: yup.string().required(),
  id_categoria_mlb: yup.string().required(),
  largura: yup.string().required(),
  material: yup.string().required(),
  medida: yup.string().required(),
  nome: yup.string().required(),
  observacoes: yup.string(),
  peso: yup.string().required(),
  posicao: yup.string().required(),
  registro_inmetro: yup.string().required(),
  seguimento: yup.string().required(),
  sinonimos: yup.string().required(),
  sistema: yup.string().required(),
  subgrupo: yup.string().required(),
  tipo_anuncio_mlb: yup.string().required(),
  titulo: yup.string().required(),
});

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
  const { addToast } = useToast();
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const validateSubmitData = useCallback(async (data): Promise<{
    error: boolean;
  }> => {
    try {
      const isDataValid = await dataSchema.validateSync(data);
      return {
        error: false,
      };
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      return {
        error: true,
      };
    }
  }, []);
  const handleFormsubmit = useCallback(async data => {
    try {
      const { error } = await validateSubmitData(data);
      if (error) {
        addToast({
          title: 'Erro na validação dos campos do produto',
          description: 'Verifique os dados preenchidos',
          type: 'error',
        });
        return;
      }
      const { status } = await api.post('/api/products', data);

      if (status === 201) {
        addToast({
          title: 'Produto criado com sucesso',
          type: 'success',
        });

        router.push('/admin/products');
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: 'Falha ao criar produto',
        type: 'error',
        description: 'Um erro inesperado aconteceu, tente novamente mais tarde',
      });
    }
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
            <SessionDescricao />
            <SessionEspecificacoes />
            <SessionAplicacoes />
            <SessionFornecedores control={control} />
            <FormErrorMessage>{errors}</FormErrorMessage>

            <Button
              mt={4}
              isLoading={isSubmitting}
              disabled={isSubmitting}
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
