import { Flex, Checkbox } from '@chakra-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Header } from '.';
import { Field } from '../../../pages/admin/products/create';
import { Select } from '../../ReactHookForm';
import { Input } from '../../ReactHookForm/Input';

const productFields: Field[] = [
  {
    label: 'ID Interno',
    name: 'idInterno',
    type: 'text',
  },
  {
    label: 'Seguimento',
    name: 'seguimento',
    type: 'text',
  },
  {
    label: 'Título',
    name: 'titulo',
    type: 'text',
  },
  {
    label: 'Nome Produto',
    name: 'nome',
    type: 'text',
  },
  {
    label: 'Sinônimos',
    name: 'sinonimos',
    type: 'text',
  },
  {
    label: 'Grupo',
    name: 'grupo',
    type: 'select',
    values: [
      { option: 'Motor', value: 1 },
      { option: 'Escapamento', value: 2 },
      { option: 'Transmissão', value: 3 },
      { option: 'Direção', value: 4 },
      { option: 'Suspensão', value: 5 },
      { option: 'Freio', value: 6 },
      { option: 'Chassis', value: 7 },
      { option: 'Carroceria', value: 8 },
      { option: 'Elétrica', value: 9 },
      { option: 'Acessórios', value: 0 },
    ],
  },
  {
    label: 'SubGrupo ',
    name: 'subgrupo',
    type: 'select',
    values: [
      { value: 101, option: 'Bloco' },
      { value: 103, option: 'Carter' },
      { value: 105, option: 'Virabrequim' },
      { value: 107, option: 'Balanceiro' },
      { value: 109, option: 'Comando Vávulas' },
      { value: 115, option: 'Bomba Óleo' },
      { value: 117, option: 'Radiador Óleo' },
      { value: 119, option: 'Chapas Motor' },
      { value: 121, option: 'Radiador Agua' },
      { value: 127, option: 'Bomba Combustivel' },
      { value: 129, option: 'Carburador' },
      { value: 130, option: 'Injeção' },
      { value: 139, option: 'Ignição' },
      { value: 141, option: 'Embreagem' },
      { value: 198, option: 'Kits Motor' },
      { value: 199, option: 'Fixação Motor' },
    ],
  },
  {
    label: 'Medida',
    name: 'medida',
    type: 'select',
    values: [
      { value: '10mm', option: '10mm' },
      { value: 'STD', option: 'STD' },
      { value: '0,25MM=0,10"', option: '0,25MM=0,10"' },
      { value: '0,30MM', option: '0,30MM' },
      { value: '0,40MM', option: '0,40MM' },
      { value: '0,50MM=0,20"', option: '0,50MM=0,20"' },
      { value: '0,60MM', option: '0,60MM' },
      { value: '0,75MM=0,30"', option: '0,75MM=0,30"' },
      { value: '0,80MM', option: '0,80MM' },
      { value: '1,00MM=0,40"', option: '1,00MM=0,40"' },
      { value: '1,25MM', option: '1,25MM' },
      { value: ' 1,50MM=0,60"', option: ' 1,50MM=0,60"' },
    ],
  },
  {
    label: 'Posição',
    name: 'posicao',
    type: 'select',
    values: [
      { option: 'Iguais', value: 'Iguais' },
      { option: 'Direito', value: 'Direito' },
      { option: 'Esquerdo', value: 'Esquerdo' },
      { option: 'Inferior', value: 'Inferior' },
      { option: 'Superior', value: 'Superior' },
      { option: 'Anterior', value: 'Anterior' },
      { option: 'Posterior', value: 'Posterior' },
      { option: 'Dianteiro', value: 'Dianteiro' },
      { option: 'Traseiro', value: 'Traseiro' },
      { option: 'Central', value: 'Central' },
      { option: 'Frontal', value: 'Frontal' },
    ],
  },
  {
    label: 'Sistema',
    name: 'sistema',
    type: 'select',
    values: [
      { value: 'Com Unha', option: 'Com Unha' },
      { value: 'Sem Unha', option: 'Sem Unha' },
      { value: 'Com Flange', option: 'Com Flange' },
      { value: 'Sem Flange', option: 'Sem Flange' },
      { value: 'Com Retentor', option: 'Com Retentor' },
      { value: 'Sem Retentor', option: 'Sem Retentor' },
    ],
  },
  {
    label: 'Cor',
    name: 'cor',
    type: 'select',
    values: [
      { value: 'Ambar', option: 'Ambar' },
      { value: 'Amarelo', option: 'Amarelo' },
      { value: 'Azul', option: 'Azul' },
      { value: 'Bege', option: 'Bege' },
      { value: 'Branco', option: 'Branco' },
      { value: 'Castanho', option: 'Castanho' },
      { value: 'Cinza', option: 'Cinza' },
      { value: 'Cromado', option: 'Cromado' },
      { value: 'Creme', option: 'Creme' },
      { value: 'Cristal', option: 'Cristal' },
      { value: 'Fosco', option: 'Fosco' },
      { value: 'Gelo', option: 'Gelo' },
      { value: 'Laranja', option: 'Laranja' },
      { value: 'Marrom', option: 'Marrom' },
      { value: 'Ouro', option: 'Ouro' },
      { value: 'Prata', option: 'Prata' },
      { value: 'Preto', option: 'Preto' },
      { value: 'Rosa', option: 'Rosa' },
      { value: 'Roxo', option: 'Roxo' },
      { value: 'Samão', option: 'Samão' },
      { value: 'Verde', option: 'Verde' },
      { value: 'Vermelho', option: 'Vermelho' },
      { value: 'Violeta', option: 'Violeta' },
    ],
  },
  {
    label: 'Material',
    name: 'material',
    type: 'select',
    values: [
      { value: 'Amianto', option: 'Amianto' },
      { value: 'Acrílico', option: 'Acrílico' },
      { value: 'Aluminio', option: 'Aluminio' },
      { value: 'Aluminio Bazado', option: 'Aluminio Bazado' },
      { value: 'Borracha', option: 'Borracha' },
      { value: 'Cerâmica', option: 'Cerâmica' },
      { value: 'Couro', option: 'Couro' },
      { value: 'Curvin', option: 'Curvin' },
      { value: 'Chapa', option: 'Chapa' },
      { value: 'Cobre', option: 'Cobre' },
      { value: 'Duro Aluminio', option: 'Duro Aluminio' },
      { value: 'Elastômero', option: 'Elastômero' },
      { value: 'Ferro', option: 'Ferro' },
      { value: 'Fibra', option: 'Fibra' },
      { value: 'Fluorelastômero', option: 'Fluorelastômero' },
      { value: 'Laminado', option: 'Laminado' },
      { value: 'Liga Leve', option: 'Liga Leve' },
      { value: 'Magnésio', option: 'Magnésio' },
      { value: 'Metal', option: 'Metal' },
      { value: 'Nélpreme', option: 'Nélpreme' },
      { value: 'Nitrílico', option: 'Nitrílico' },
      { value: 'Ouro', option: 'Ouro' },
      { value: 'Plástico', option: 'Plástico' },
      { value: 'Polietileno', option: 'Polietileno' },
      { value: 'Poliacrílico', option: 'Poliacrílico' },
      { value: 'Polipropileno', option: 'Polipropileno' },
      { value: 'Poliuretano', option: 'Poliuretano' },
      { value: 'Prata', option: 'Prata' },
      { value: 'PVC', option: 'PVC' },
      { value: 'Silicone', option: 'Silicone' },
      { value: 'Teflon', option: 'Teflon' },
      { value: 'Temperado', option: 'Temperado' },
      { value: 'Viton', option: 'Viton' },
      { value: 'Zamac', option: 'Zamac' },
      { value: 'Zinco', option: 'Zinco' },
    ],
  },
  {
    label: 'Observações',
    name: 'observacoes',
    type: 'text',
  },
  {
    label: 'Desativado',
    name: 'desativado',
    type: 'boolean',
  },
];

export const SessionDescricao = () => {
  const methods = useFormContext();
  return (
    <React.Fragment>
      <Header>Descrição</Header>
      <Flex flexWrap="wrap" alignItems="end">
        {productFields.map(productField => {
          switch (productField.type) {
            case 'boolean': {
              return (
                <Checkbox
                  key={productField.name}
                  ref={methods.register()}
                  name={productField.name}
                  children="Inativo"
                />
              );
            }
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
    </React.Fragment>
  );
};
