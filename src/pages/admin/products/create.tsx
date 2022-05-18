import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Select,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import AdminLeftMenu from '../../../components/Admin/LeftMenu';
import Header from '../../../components/Header';
import AdminRightMenu from '../../../components/Admin/RightMenu';
import api from '../../../services/api';

interface FormData {
  inactive: string;
  group_id: string;
  subgroup_id: string;
  automaker: string;
  model: string;
  year_start: string;
  year_end: string;
  engine: string;
  complement: string;
  quantity_used: string;
  quantity_package: string;
  size: string;
  height: string;
  width: string;
  lenth: string;
  weight: string;
  inner_diameter: string;
  external_diameter: string;
  title: string;
  name: string;
  type: string;
  position: string;
  system: string;
  color: string;
  material: string;
  obs: string;
}

const Input = styled.input`
  width: 140px;
  height: 48px;
  border: 1px solid #6f6f6f;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 4px;
`;

type Field = {
  name: string;
  type: string;
  values?: {
    option: string;
    value: number | string;
  }[];
};

const customFields: Field[] = [
  {
    name: 'Montadora',
    type: 'text',
  },
  {
    name: 'Modelo',
    type: 'text',
  },
  {
    name: 'AnoMod.De',
    type: 'number',
  },
  {
    name: 'AnoMod.Ate',
    type: 'number',
  },
  {
    name: 'Chassi.De',
    type: 'text',
  },
  {
    name: 'Chassi.Ate',
    type: 'text',
  },
  {
    name: 'Motor',
    type: 'text',
  },
  {
    name: 'Combustivel',
    type: 'text',
  },
  {
    name: 'Complemento',
    type: 'text',
  },
  {
    name: 'Quantidade de Uso',
    type: 'number',
  },
  {
    name: 'Criado em',
    type: 'date',
  },
  {
    name: 'Atualizado Em',
    type: 'date',
  },
];

const productFields: Field[] = [
  {
    name: 'ID Interno',
    type: 'text',
  },
  {
    name: 'Seguimento',
    type: 'text',
  },
  {
    name: 'Título do Produto (60 caracteres )',
    type: 'text',
  },
  {
    name: 'Nome Produto',
    type: 'text',
  },
  {
    name: 'Sinônimos',
    type: 'text',
  },
  {
    name: 'Grupo',
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
    name: 'SubGrupo ',
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
    name: 'Medida',
    type: 'text',
  },
  {
    name: 'Posição',
    type: 'text',
  },
  {
    name: 'Sistema',
    type: 'text',
  },
  {
    name: 'Cor',
    type: 'text',
  },
  {
    name: 'Material',
    type: 'text',
  },
  {
    name: 'Observações',
    type: 'text',
  },
  {
    name: 'Desativado',
    type: 'boolean',
  },
];

const especificacoesFields: Field[] = [
  {
    name: 'Diâmetro Interno (mm)',
    type: 'number',
  },
  {
    name: 'Diâmetro Externo (mm)',
    type: 'number',
  },
  {
    name: 'Espessura (mm)',
    type: 'number',
  },
  {
    name: 'Peso (kg)',
    type: 'number',
  },
  {
    name: 'Comprimento (cm)',
    type: 'number',
  },
  {
    name: 'Largura (cm) ',
    type: 'number',
  },
  {
    name: 'Altura (cm)',
    type: 'number',
  },
  {
    name: 'Condições MLB',
    type: 'text',
  },
  {
    name: 'Tipo Anuncio MLB',
    type: 'text',
  },
  {
    name: 'ID Categoria MLB',
    type: 'text',
  },
  {
    name: 'Registro INMETRO',
    type: 'text',
  },
  {
    name: 'Detalhes Produto Ficha Técnica MLB',
    type: 'text',
  },
  {
    name: 'Foto Produto',
    type: 'text',
  },
  {
    name: 'Foto Produto',
    type: 'text',
  },
  {
    name: 'Foto Produto',
    type: 'text',
  },
];

const fornecedoresEquivalentesFields: Field[] = [
  {
    name: 'Fornecedor',
    type: 'text',
  },
  {
    name: 'SKU Código Fornecedor ',
    type: 'text',
  },
  {
    name: 'Qualidade',
    type: 'text',
  },
  {
    name: 'Marca',
    type: 'text',
  },
  {
    name: 'MPN CódigoMarca',
    type: 'text',
  },
  {
    name: 'EAN CódigoBarras',
    type: 'text',
  },
  {
    name: 'OEM CódigoOriginal',
    type: 'text',
  },
  {
    name: 'Estoque Fornecedor',
    type: 'text',
  },
  {
    name: 'Embalagem Compra',
    type: 'text',
  },
  {
    name: 'Embalagem  Venda',
    type: 'text',
  },
  {
    name: 'Unidade',
    type: 'text',
  },
  {
    name: 'Preço Custo',
    type: 'text',
  },
  {
    name: 'Preço Venda',
    type: 'text',
  },
  {
    name: 'NCM CódigoFiscal',
    type: 'text',
  },
  {
    name: 'Local Produto',
    type: 'text',
  },
  {
    name: 'Venda Média',
    type: 'text',
  },
];
export default function Create(): React.ReactNode {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'aplicacoes',
  });
  const {
    fields: fieldsFornecedores,
    append: appendFornecedores,
    remove: removeFornecedores,
  } = useFieldArray({
    control,
    name: 'fornecedores',
  });

  useEffect(() => {
    append({});
    appendFornecedores({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormsubmit = useCallback(async data => {
    const res = await api.post('/api/products', data);
  }, []);

  return (
    <>
      <Flex justify="space-between" alignItems="center" h={80} mb={16} px={12}>
        <AdminLeftMenu />
        <Header />
        <AdminRightMenu />
      </Flex>
      <form onSubmit={handleSubmit(handleFormsubmit)}>
        <FormControl>
          {/* DESCRICOES */}
          <Box mb={8} w="100vw" bg="teal" textAlign="center" color="#FFF">
            <Heading py={4}>Descriçoes</Heading>
          </Box>
          <Flex flexWrap="wrap">
            {productFields.map(productField => {
              if (productField.type === 'boolean')
                return (
                  <Checkbox
                    defaultChecked
                    ref={register()}
                    name={productField.name}
                  >
                    Inativo
                  </Checkbox>
                );

              if (productField.type === 'select')
                return (
                  <Select
                    placeholder={productField.name}
                    ref={register()}
                    name={productField.name}
                  >
                    {productField.values.map(({ value, option }) => (
                      <option key={value} value={value}>
                        {option}
                      </option>
                    ))}
                  </Select>
                );

              return (
                <Input
                  ref={register()}
                  key={productField.name}
                  placeholder={productField.name}
                  type={productField.type}
                  name={productField.name}
                />
              );
            })}
          </Flex>

          {/* ESPECIFICACOES */}
          <Box my={8} w="100vw" bg="teal" textAlign="center" color="#FFF">
            <Heading py={4}>Especificações</Heading>
          </Box>
          <Flex flexWrap="wrap">
            {especificacoesFields.map(productField => {
              if (productField.type === 'boolean')
                return (
                  <Checkbox
                    defaultChecked
                    ref={register()}
                    name={productField.name}
                  >
                    Inativo
                  </Checkbox>
                );

              if (productField.type === 'select')
                return (
                  <Select
                    placeholder={productField.name}
                    ref={register()}
                    name={productField.name}
                  >
                    {productField.values.map(({ value, option }) => (
                      <option key={value} value={value}>
                        {option}
                      </option>
                    ))}
                  </Select>
                );

              return (
                <Input
                  ref={register()}
                  key={productField.name}
                  placeholder={productField.name}
                  type={productField.type}
                  name={productField.name}
                />
              );
            })}
          </Flex>

          {/* APLICACOES */}
          <Box my={8} w="100vw" bg="teal" textAlign="center" color="#FFF">
            <Heading py={4}>Aplicações</Heading>
          </Box>
          {fields.map((item, index) => {
            return (
              <Flex key={item.id} flexWrap="wrap">
                {customFields.map(field => (
                  <Flex key={field.name}>
                    <Input
                      ref={register()}
                      name={`aplicacoes[${index}].${field.name}`}
                      type={field.type}
                      placeholder={field.name}
                      defaultValue={item[field.name]}
                    />
                  </Flex>
                ))}
                <IconButton
                  ml={20}
                  aria-label="remove line icon"
                  icon={<DeleteIcon />}
                  onClick={() => remove(index)}
                />
              </Flex>
            );
          })}
          <Button
            ml={20}
            bg="lightblue"
            p={4}
            mt={2}
            borderRadius={4}
            aria-label="add line icon"
            onClick={() => append({})}
          >
            Adicionar aplicação
          </Button>

          {/* FORNECEDORES EQUIVALENTES */}
          <Box my={8} w="100vw" bg="teal" textAlign="center" color="#FFF">
            <Heading py={4}>Fornecedores Equivalentes</Heading>
          </Box>
          <Flex flexWrap="wrap">
            {fieldsFornecedores.map((item, index) => {
              return (
                <Flex key={item.id} flexWrap="wrap" mt={16}>
                  {fornecedoresEquivalentesFields.map(field => (
                    <Flex key={field.name}>
                      <Input
                        ref={register()}
                        name={`fornecedores[${index}].${field.name}`}
                        type={field.type}
                        placeholder={field.name}
                        defaultValue={item[field.name]}
                      />
                    </Flex>
                  ))}
                  <IconButton
                    ml={20}
                    aria-label="remove line icon"
                    icon={<DeleteIcon />}
                    onClick={() => removeFornecedores(index)}
                  />
                </Flex>
              );
            })}
            <Button
              ml={20}
              bg="lightblue"
              p={4}
              mt={2}
              borderRadius={4}
              aria-label="add line icon"
              onClick={() => appendFornecedores({})}
            >
              Adicionar fornecedor
            </Button>
          </Flex>
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
    </>
  );
}
