/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  // eslint-disable-next-line prettier/prettier
  Link,
} from '@chakra-ui/core';
import React, { useCallback } from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { IProduct } from '../../../types';
import { formatPrice } from '../../../utils/formatPrice';
import MeasureProducts from '../../MeasureProducts';
import ModalProduct from '../../ModalProduct';

interface ProductItemProps {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  group?: string;
  obs?: string;
  image?: string;
  product?: IProduct;
  size?: string | any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  price,
  group,
  obs,
  image,
  size,
}) => {
  return (
    <Flex
      margin={1}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      maxWidth="30vh"
    >
      <Box p="6">
        <Flex align="center" justify="center" marginBottom={5}>
          <Box>
            <Link href="#">
              <Image
                maxHeight="100px"
                maxWidth="200px"
                src={image || '/home.png'}
                alt="Imagem do produto"
              />
            </Link>
          </Box>

          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="orange">
              {group}
            </Badge>
          </Box>
        </Flex>

        <Box
          marginTop={2}
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Link color="blue.500" href="#">
            {name}
          </Link>
        </Box>
        <Box d="flex" alignItems="baseline" maxWidth="100vh">
          {obs}
        </Box>

        <Box marginTop={5}>
          <ModalProduct name={name} detailsProducts={obs} />
        </Box>

        <Box marginTop={2}>
          <AccordionItem>
            <AccordionHeader _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box maxWidth="200px">Medida</Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel marginLeft="-18px">
              <MeasureProducts valuesMeasure={size} />
            </AccordionPanel>
          </AccordionItem>
        </Box>

        <Box marginTop={2}>
          <AccordionItem>
            <AccordionHeader _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="left">
                Qualidade
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>
              <Box style={{ fontWeight: 'bold', color: 'orange' }}>
                SIMILAR: {formatPrice(price ?? 1)}
              </Box>
              <Box style={{ fontWeight: 'bold', color: 'blue' }}>
                ORIGINAL: {formatPrice(price ?? 2)}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Box>
        <Box marginTop={5} alignItems="center" justifyContent="center">
          <Button
            type="button"
            marginLeft={-3}
            onClick={() => {}}
            size="sm"
            leftIcon={FaCartArrowDown}
            variantColor="green"
            variant="solid"
          >
            {/* <Box marginLeft={-1} marginRight={2}>{ hasFailedStockCheck && <span style={{ color: 'red'}}>Falta de estoque</span>}</Box> */}
            Adicionar ao Carrinho
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductItem;
