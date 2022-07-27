import { Flex, Checkbox } from '@chakra-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Header } from '.';
import { Field } from '../../../pages/admin/products/create';
import { Select, Input } from '../../ReactHookForm';

const especificacoesFields: Field[] = [
  {
    name: 'diametro_interno',
    label: 'Diâmetro Interno (mm)',
    type: 'number',
  },
  {
    name: 'diametro_externo',
    label: 'Diâmetro Externo (mm)',
    type: 'number',
  },
  {
    name: 'espessura',
    label: 'Espessura (mm)',
    type: 'number',
  },
  {
    name: 'peso',
    label: 'Peso (kg)',
    type: 'number',
  },
  {
    name: 'comprimento',
    label: 'Comprimento (cm)',
    type: 'number',
  },
  {
    name: 'largura',
    label: 'Largura (cm) ',
    type: 'number',
  },
  {
    name: 'altura',
    label: 'Altura (cm)',
    type: 'number',
  },
  {
    name: 'condicoes_mlb',
    label: 'Condições MLB',
    type: 'text',
  },
  {
    name: 'tipo_anuncio_mlb',
    label: 'Tipo Anuncio MLB',
    type: 'text',
  },
  {
    name: 'id_categoria_mlb',
    label: 'ID Categoria MLB',
    type: 'text',
  },
  {
    name: 'registro_inmetro',
    label: 'Registro INMETRO',
    type: 'text',
  },
  {
    name: 'detalhes_ficha_tecnica_mlb',
    label: 'Detalhes Produto Ficha Técnica MLB',
    type: 'text',
  },
];
export const SessionEspecificacoes = (): JSX.Element => {
  const methods = useFormContext();
  return (
    <>
      <Header>Especificações</Header>
      <Flex flexWrap="wrap">
        {especificacoesFields.map(productField => {
          switch (productField.type) {
            case 'boolean':
              return (
                <Checkbox
                  name={productField.name}
                  {...methods.register(productField.name)}
                >
                  Inativo
                </Checkbox>
              );

            case 'select':
              return <Select productField={productField} />;
            default:
              return (
                <Input
                  key={productField.name}
                  label={productField.label}
                  name={productField.name}
                />
              );
          }
        })}
      </Flex>
    </>
  );
};
