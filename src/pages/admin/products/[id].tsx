import React, { useMemo } from 'react';
import api from '../../../services/api';
import { Form, ObjectFieldStyles, Field } from 'react-hook-form-generator';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useEffect } from 'react';
import { CollectionsBookmarkRounded } from '@material-ui/icons';
import { Box, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
  SessionAplicacoes,
  SessionDescricao,
  SessionEspecificacoes,
  SessionFornecedores,
} from '../../../components/Product/CreatePage';

export default function Edit({ product }): React.ReactNode {
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

  console.log('sedas ', product);

  const methods = useForm({
    defaultValues: {
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
      diametro_interno: product.productsEspecification.diametro_interno ?? null,
      diametro_externo: product.productsEspecification.diametro_externo ?? null,
      espessura: product.productsEspecification.expessura_cm ?? null,
      peso: product.productsEspecification.peso_kg ?? null,
      comprimento: product.productsEspecification.comprimento_cm ?? null,
      largura: product.productsEspecification.largura_cm ?? null,
      altura: product.productsEspecification.altura_cm ?? null,
      condicoes_mlb: product.productsEspecification.condicoes_mlb ?? null,
      tipo_anuncio_mlb: product.productsEspecification.tipo_anuncio_mlb ?? null,
      id_categoria_mlb: product.productsEspecification.id_categoria_mlb ?? null,
      registro_inmetro: product.productsEspecification.registro_inmetro ?? null,
      detalhes_ficha_tecnica_mlb:
        product.productsEspecification.detalhes_ficha_tecnica_mlb ?? null,
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
    formState: { errors, isSubmitting },
  } = methods;

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

  const handleSubmit = async event => {
    const { descricao, aplicacoes, fornecedores } = event;

    try {
      const data = {
        ...event,
        descricao: {
          ...descricao,
          grupo: parseGroups[descricao.grupo],
          subgrupo: parseSubgroups[descricao.subgrupo],
        },
        aplicacoes: aplicacoes?.map((ap: any) => ap.value),
        fornecedores: fornecedores?.map((ap: any) => ap.value),
      };

      await api.post('/api/products', data);
    } catch (error) {
      console.error('sedas error:', error);
    }
  };

  return (
    <Box p={20}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <FormControl>
            <SessionDescricao />
            <SessionEspecificacoes />
            <SessionAplicacoes aplicacoes={product.publicApplications} />
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

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.POSTGRES_URI}/api/products/`);
  const products = await res.json();

  return {
    paths: products.map(product => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const res = await fetch(
    `${process.env.POSTGRES_URI}/api/products/${context.params.id}`,
  );
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
};
