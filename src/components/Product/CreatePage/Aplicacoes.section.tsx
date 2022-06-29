import React, { useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/core';
import { Field } from '../../../pages/admin/products/create';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ActionButton, Header } from '.';
import { Input } from '../../ReactHookForm';
import { Box } from '@chakra-ui/react';

const customFields: Field[] = [
  {
    name: 'montadora',
    label: 'Montadora',
    type: 'text',
  },
  {
    name: 'modelo',
    label: 'Modelo',
    type: 'text',
  },
  {
    name: 'anoMod.de',
    label: 'Ano modelo de:',
    type: 'number',
  },
  {
    name: 'anoMod.ate',
    label: 'Ano modelo ate:',
    type: 'number',
  },
  {
    name: 'chassi.de',
    label: 'Chassi de:',
    type: 'text',
  },
  {
    name: 'chassi.ate',
    label: 'Chassi ate:',
    type: 'text',
  },
  {
    name: 'motor',
    label: 'Motor',
    type: 'text',
  },
  {
    name: 'combustivel',
    label: 'Combustivel',
    type: 'text',
  },
  {
    name: 'complemento',
    label: 'Complemento',
    type: 'text',
  },
  {
    name: 'quantidade_uso',
    label: 'Quantidade de Uso',
    type: 'number',
  },
  {
    name: 'criado_em',
    label: 'Criado em',
    type: 'date',
  },
  {
    name: 'atualizado_em',
    label: 'Atualizado Em',
    type: 'date',
  },
];

export const SessionAplicacoes = ({ aplicacoes }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'aplicacoes',
  });

  return (
    <React.Fragment>
      <Header>Aplicações</Header>
      <Flex flexWrap="wrap" bg="#cecece" borderRadius={6} mt={2} py={4}>
        {fields.map((item, index) => (
          <Flex
            key={item.id}
            mt={6}
            wrap="wrap"
            pt={2}
            borderTop={index > 0 ? '1px solid #fff' : 'none'}
          >
            {customFields.map(field => (
              <Input
                key={field.name}
                name={`aplicacoes[${index}].${field.name}`}
                label={field.label}
                defaultValue={item[field.name]}
              />
            ))}
            <ActionButton action="REMOVE" onClick={() => remove(index)} />
          </Flex>
        ))}
      </Flex>

      <ActionButton action="ADD" onClick={() => append({})} />
    </React.Fragment>
  );
};
