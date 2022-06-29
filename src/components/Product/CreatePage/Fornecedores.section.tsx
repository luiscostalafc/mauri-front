import { Flex } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ActionButton, Header } from '.';
import { Field } from '../../../pages/admin/products/create';
import { Input } from '../../ReactHookForm';

created_at: '2022-06-11T14:14:41.592-03:00';
ean_cod_barras: 'tu';
embalagem_compra: 2;
embalagem_venda: 3;
estoque_fornecedor: 2;
fornecedor: 'eu';
id: 1;
local_produto: 'curitiba';
marca: 'eu';
mpn_cod_marca: 'eu';
ncm_cod_fiscal: 'awdawd';
oem_cod_original: 'tu';
preco_custo: 12;
preco_venda: 22;
product_id: 1283;
qualidade: 'eu';
sku_cod_fornecedor: 'eu';
unidade: 'peça';
updated_at: '2022-06-11T14:14:41.592-03:00';
venda_media: 1;
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
export const SessionFornecedores = ({ control }) => {
  const {
    fields: fieldsFornecedores,
    append: appendFornecedores,
    remove: removeFornecedores,
  } = useFieldArray({
    control,
    name: 'fornecedores',
  });

  return (
    <React.Fragment>
      <Header>Fornecedores Equivalentes</Header>
      <Flex flexWrap="wrap">
        {fieldsFornecedores.map((item, index) => {
          return (
            <Flex flexWrap="wrap" bg="#cecece" borderRadius={6} mb={2} py={4}>
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
    </React.Fragment>
  );
};
