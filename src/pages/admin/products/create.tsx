import { Box, Flex, Heading, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { GrAdd } from 'react-icons/gr';

const Create = (): JSX.Element => {
  const DESCRICOES = [
    'ID Interno',
    'Seguimento',
    'Título do Produto (60 caracteres )',
    'Nome Produto',
    'Sinônimos',
    'Grupo',
    'SubGrupo ',
    'Medida',
    'Posição',
    'Sistema',
    'Côr',
    'Material',
    'Observações',
    'Desativado',
  ];

  const ESPECIFICACOES = [
    'Diâmetro Interno (mm)',
    'Diâmetro Externo (mm)',
    'Espessura (mm)',
    'Peso (kg)',
    'Comprimento (cm)',
    'Largura (cm) ',
    'Altura (cm)',
    'Condições MLB',
    'Tipo Anuncio MLB',
    'ID Categoria MLB',
    'Registro INMETRO',
    'Detalhes Produto Ficha Técnica MLB',
    'Foto Produto',
    'Foto Produto',
    'Foto Produto',
  ];

  return (
    <Box>
      <Flex justify="center" align="center" h="40" bg="green">
        <Heading>Descricoes</Heading>
      </Flex>
      <Flex flexWrap="wrap">
        {DESCRICOES.map(column => (
          <Flex flexFlow="column" flexWrap="wrap" key={column} mt="4">
            <Heading width="max-content" mr={3} ml="4">
              {column}
            </Heading>
            <Input type="text" key={column} mr={3} borderRadius="4" />
          </Flex>
        ))}
      </Flex>
      <Flex justify="center" align="center" h="40" bg="green" mt="8">
        <Heading>Especificacoes</Heading>
      </Flex>
      <Flex flexWrap="wrap" alignItems="flex-end">
        {ESPECIFICACOES.map(especificacao => (
          <Flex flexFlow="column" flexWrap="wrap" key={especificacao} mt="4">
            <Heading width="max-content" mr={3} ml="4">
              {especificacao}
            </Heading>
            <Input type="text" key={especificacao} mr={3} borderRadius="4" />
          </Flex>
        ))}
        <Button
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="green"
          w={40}
          h={30}
          _hover={{ backgroundColor: 'lightgreen' }}
          borderRadius={8}
        >
          <GrAdd />
        </Button>
      </Flex>
    </Box>
  );
};

export default Create;
