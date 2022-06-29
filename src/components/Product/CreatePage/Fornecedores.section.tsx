import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { ActionButton, Header } from '.';
import { Field } from '../../../pages/admin/products/create';
import { Input } from '../../ReactHookForm';

const fornecedoresEquivalentesFields: Field[] = [
  {
    name: 'fornecedor',
    label: 'Fornecedor',
    type: 'text',
  },
  {
    name: 'sku_cod_fornecedor',
    label: 'SKU Código Fornecedor ',
    type: 'text',
  },
  {
    name: 'qualidade',
    label: 'Qualidade',
    type: 'text',
  },
  {
    name: 'marca',
    label: 'Marca',
    type: 'text',
  },
  {
    name: 'mpn_cod_marca',
    label: 'MPN CódigoMarca',
    type: 'text',
  },
  {
    name: 'ean_cod_barras',
    label: 'EAN CódigoBarras',
    type: 'text',
  },
  {
    name: 'oem_cod_original',
    label: 'OEM CódigoOriginal',
    type: 'text',
  },
  {
    name: 'estoque_fornecedor',
    label: 'Estoque Fornecedor',
    type: 'text',
  },
  {
    name: 'embalagem_compra',
    label: 'Embalagem Compra',
    type: 'text',
  },
  {
    name: 'embalagem_venda',
    label: 'Embalagem Venda',
    type: 'text',
  },
  {
    name: 'unidade',
    label: 'Unidade',
    type: 'text',
  },
  {
    name: 'preco_custo',
    label: 'Preço Custo',
    type: 'text',
  },
  {
    name: 'preco_venda',
    label: 'Preço Venda',
    type: 'text',
  },
  {
    name: 'ncm_cod_fiscal',
    label: 'NCM CódigoFiscal',
    type: 'text',
  },
  {
    name: 'local_produto',
    label: 'Local Produto',
    type: 'text',
  },
  {
    name: 'venda_media',
    label: 'Venda Média',
    type: 'text',
  },
];
export const SessionFornecedores = ({ control }): JSX.Element => {
  const {
    fields: fieldsFornecedores,
    append: appendFornecedores,
    remove: removeFornecedores,
  } = useFieldArray({
    control,
    name: 'fornecedores',
  });

  return (
    <>
      <Header>Fornecedores Equivalentes</Header>
      <Flex flexWrap="wrap">
        {fieldsFornecedores.map((item, index) => {
          return (
            <Flex
              flexWrap="wrap"
              bg="#cecece"
              borderRadius={6}
              mb={2}
              py={4}
              key={item.id}
            >
              {fornecedoresEquivalentesFields.map(field => (
                <Flex key={item.id}>
                  <Input
                    name={`fornecedores[${index}].${field.name}`}
                    label={field.label}
                    defaultValue={item[field.name]}
                  />
                </Flex>
              ))}

              <ActionButton
                action="REMOVE"
                onClick={() => removeFornecedores(index)}
              />
            </Flex>
          );
        })}
        <ActionButton action="ADD" onClick={() => appendFornecedores({})} />
      </Flex>
    </>
  );
};
