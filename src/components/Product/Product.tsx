import {
  Box,
  Image,
  Badge,
  Flex,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  AccordionButton,
  Button,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { TableContainer } from '@material-ui/core';
import { useCartStore } from '../../stores/cartStore';

export const Product = ({ product }) => {
  const hasFornecedores =
    product.productsEquivalentSuppliers &&
    product.productsEquivalentSuppliers.length;
  const addProductToCart = useCartStore(store => store.addProduct);

  return (
    <Box
      margin={12}
      rounded="lg"
      overflow="hidden"
      minWidth="350px"
      maxWidth={[400, 600, 800]}
      border="1px solid #dedede"
      px={10}
      py={20}
      borderRadius={8}
    >
      <Flex marginBottom={5}>
        <Image
          maxHeight="100px"
          maxWidth="200px"
          src="/home.png"
          alt="Imagem do produto"
        />

        <Box
          bg="#fab05b"
          color="white"
          h={22}
          fontSize={12}
          px={8}
          borderRadius={6}
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
        >
          {product.group?.group}
        </Box>
      </Flex>

      <Heading marginTop={8} fontWeight="bold">
        {product.nome}
      </Heading>
      <Box d="flex" alignItems="baseline" maxWidth="100vh" color="#575757">
        {product.titulo}
      </Box>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem
          border="1px solid #7a7a7a"
          borderRadius={12}
          overflow="hidden"
        >
          <AccordionButton p={4} _expanded={{ bg: 'tomato', color: 'white' }}>
            <Box textAlign="left" flex={1} p={4}>
              Medida
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel p={6}>{product.medida} cm</AccordionPanel>
        </AccordionItem>

        <AccordionItem
          border="1px solid #7a7a7a"
          borderRadius={12}
          overflow="hidden"
        >
          <AccordionButton p={4} _expanded={{ bg: 'teal', color: 'white' }}>
            <Box flex="1" textAlign="left" p={4}>
              Preço
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <TableContainer>
              {hasFornecedores ? (
                <Thead w="100%">
                  <Tr>
                    <Th>Fornecedor</Th>
                    <Th>Marca</Th>
                    <Th isNumeric>Preço venda</Th>
                  </Tr>
                </Thead>
              ) : (
                <Heading color="#575757" fontSize={14} p={4}>
                  Nenhum fornecedor informado
                </Heading>
              )}
              <Table variant="striped" colorScheme="primary" w="100%">
                {hasFornecedores
                  ? product.productsEquivalentSuppliers.map(fornecedor => (
                      <Tbody w="100%" key={fornecedor.id}>
                        <Tr>
                          <Td>{fornecedor.fornecedor}</Td>
                          <Td>{fornecedor.marca}</Td>
                          <Td isNumeric textAlign="right">
                            R$ {fornecedor.preco_venda}
                          </Td>
                        </Tr>
                      </Tbody>
                    ))
                  : null}
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box marginTop={5} alignItems="center" justifyContent="center">
        <Button
          type="button"
          marginLeft={-3}
          size="sm"
          leftIcon={<FaCartArrowDown />}
          variant="outline"
          color="#FFF"
          px={8}
          py={2}
          borderRadius={4}
          bg="teal"
          ml={6}
          onClick={() => addProductToCart(product)}
        >
          Adicionar ao Carrinho
        </Button>
      </Box>
    </Box>
  );
};
