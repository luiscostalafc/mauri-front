import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import api from '../../../services/api';
import {
  SessionAplicacoes,
  SessionDescricao,
  SessionEspecificacoes,
  SessionFornecedores,
} from '../../../components/Product/CreatePage';
import { GetStaticProps } from 'next';
import * as yup from 'yup';
import { useToast } from '../../../hooks/toast';
import { useRouter } from 'next/router';

const dataSchema = yup.object({
  descricao: yup.object({
    idInterno: yup.number().required(),
    seguimento: yup.string().required(),
    titulo: yup.string().required(),
    nome: yup.string().required(),
    sinonimos: yup.string().required(),
    medida: yup.string().required(),
    posicao: yup.string().required(),
    sistema: yup.string().required(),
    grupo: yup.number().required(),
    subgrupo: yup.number().required(),
    cor: yup.string().required(),
    desativado: yup.bool().required(),
  }),
});
const parseGroups = {
  Motor: 1,
  Escapamento: 2,
  Transmissão: 3,
  Direção: 4,
  Suspensão: 5,
  Freio: 6,
  Chassis: 7,
  Carroceria: 8,
  Elétrica: 9,
  Acessórios: 0,
};

const capitalize = (word: string) => {
  return word[0].toUpperCase() + word.substring(1);
};

const parseSubgroups = {
  Bloco: 101,
  Carter: 103,
  Virabrequim: 105,
  Balanceiro: 107,
  'Comando Vávulas': 109,
  'Bomba Óleo': 115,
  'Radiador Óleo': 117,
  'Chapas Motor': 119,
  'Radiador Agua': 121,
  'Bomba Combustivel': 127,
  Carburador: 129,
  Injeção: 130,
  Ignição: 139,
  Embreagem: 141,
  'Kits Motor': 198,
  'Fixação Motor': 199,
};

export default function Edit(): React.ReactNode {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    const { signal } = new AbortController();
    setTimeout(() => {
      const href = window.location.href.split('/products/');
      const id = href.splice(-1)[0];
      fetch(`${process.env.POSTGRES_URI}/api/products/${id}`, {
        signal,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.id) {
            setValue('idInterno', data.id);
            setValue('seguimento', data.seguimento);
            setValue('titulo', data.titulo);
            setValue('nome', data.nome);
            setValue('sinonimos', data.sinonimos);
            setValue('grupo', data.group_id);
            setValue('subgrupo', data.subgroup_id);
            setValue('medida', data.medida);
            setValue('cor', capitalize(data.cor));
            setValue('observacoes', data.observacoes);
            setValue('posicao', capitalize(data.posicao));
            setValue('sistema', data.sistema);
            setValue(
              'diametro_interno',
              data.productsEspecification.diametro_interno,
            );
            setValue(
              'diametro_externo',
              data.productsEspecification.diametro_externo,
            );
            setValue('espessura', data.productsEspecification.expessura_cm);
            setValue('peso', data.productsEspecification.peso_kg);
            setValue('comprimento', data.productsEspecification.comprimento_cm);
            setValue('largura', data.productsEspecification.largura_cm);
            setValue('altura', data.productsEspecification.altura_cm);
            setValue(
              'condicoes_mlb',
              data.productsEspecification.condicoes_mlb,
            );
            setValue(
              'tipo_anuncio_mlb',
              data.productsEspecification.tipo_anuncio_mlb,
            );
            setValue(
              'id_categoria_mlb',
              data.productsEspecification.id_categoria_mlb,
            );
            setValue(
              'registro_inmetro',
              data.productsEspecification.registro_inmetro,
            );
            setValue(
              'detalhes_ficha_tecnica_mlb',
              data.productsEspecification.detalhes_ficha_tecnica_mlb,
            );
            setProduct(data);
          } else setError('Produto nao encontrado');
        });
    }, 500);
  }, []);

  const methods = useForm({
    defaultValues: !product
      ? {}
      : {
          idInterno: product.id ?? null,
          seguimento: product.seguimento ?? null,
          titulo: product.titulo ?? null,
          nome: product.nome ?? null,
          sinonimos: product.sinonimos ?? null,
          medida: product.medida ?? null,
          posicao: product.posicao ?? null,
          sistema: product.sistema ?? null,
          grupo: product.group.id ?? null,
          subgrupo: product.subgroup.id ?? null,
          cor: product.cor ?? null,
          observacoes: product.observacoes ?? null,
          desativado: product.desativado ?? null,
          diametro_interno:
            product.productsEspecification?.diametro_interno ?? null,
          diametro_externo:
            product.productsEspecification?.diametro_externo ?? null,
          espessura: product.productsEspecification?.expessura_cm ?? null,
          peso: product.productsEspecification?.peso_kg ?? null,
          comprimento: product.productsEspecification?.comprimento_cm ?? null,
          largura: product.productsEspecification?.largura_cm ?? null,
          altura: product.productsEspecification?.altura_cm ?? null,
          condicoes_mlb: product.productsEspecification?.condicoes_mlb ?? null,
          tipo_anuncio_mlb:
            product.productsEspecification?.tipo_anuncio_mlb ?? null,
          id_categoria_mlb:
            product.productsEspecification?.id_categoria_mlb ?? null,
          registro_inmetro:
            product.productsEspecification?.registro_inmetro ?? null,
          detalhes_ficha_tecnica_mlb:
            product.productsEspecification?.detalhes_ficha_tecnica_mlb ?? null,
          fornecedores: product.productsEquivalentSuppliers ?? null,
          aplicacoes:
            product.publicApplications?.map(ap => ({
              montadora: ap.montadora,
              modelo: ap.modelo,
              'anoMod.de': ap.ano_mod_de,
              'anoMod.ate': ap.ano_mod_ate,
              'chassi.de': ap.chassi_de,
              'chassi.ate': ap.chassi_ate,
              motor: ap.motor,
              combustivel: ap.combustivel,
              complemento: ap.complemento,
              quantidade_uso: ap.quantidade_uso,
              criado_em: ap.criado_em,
              atualizado_em: ap.atualizado_em,
            })) ?? null,
        },
  });
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  if (!product && !error) {
    return (
      <Flex justify="center" mt={24} fontSize={16}>
        Carregando produto...
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" mt={24} fontSize={16} color="red">
        {error}
      </Flex>
    );
  }

  const handleSubmit = async (event): Promise<void> => {
    const { aplicacoes, fornecedores } = event;
    try {
      const data = {
        descricao: {
          ...event,
          idInterno: product.id,
          grupo: event.grupo,
          subgrupo: event.subgrupo,
        },
        aplicacoes,
        fornecedores,
      };
      const dataValidation = await dataSchema.validate(data);

      await api.post('/api/products/edit', data);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errorType = error.type;
        const errorPath = error.path;
        const errorField = errorPath.includes('.')
          ? errorPath.split('.')[1]
          : errorPath;
        if (errorType === 'required') {
          addToast({
            type: 'error',
            title: 'Ops',
            description: `O campo ${errorField} é obrigatório`,
          });
        }
      }
    }
  };

  return (
    <Box p={20}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <FormControl>
            <SessionDescricao />
            <SessionEspecificacoes />
            <SessionAplicacoes />
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
  );
}
