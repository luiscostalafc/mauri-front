import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Header, Container, Content } from './styles';
import Menu from './components/Menu';
import { useFetch } from '../../hooks/useFetch';
import { useRouter } from 'next/router';
import ProductItem from '../Product/ProductItem';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { Product } from '../../types/Product';
import { Badge, Icon, Grid, GridItem } from '@chakra-ui/react';
import { Box, Flex, Image, Input, Select, Text, Button } from '@chakra-ui/core';

interface Filters {
  value: string;
  name: string;
}
const MobileHome: React.FC = () => {
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const filters = useRef<Filters | null>(null);

  let paramsState: any = new URLSearchParams(
    window?.location?.search,
  ).toString();
  const handleFilters = (e: any) => {
    const { name, value } = e.target;

    filters.current = { name, value };
  };

  const clearFilter = () => (filters.current = null);

  const linkToApiCall = (() => {
    const hasFilters = router.asPath.includes('?');
    if (hasFilters) {
      const [filterBy, value] = router.asPath.split('?')[1].split('=');
      console.log('sedas', filterBy, value);
      if (filterBy === 'group_by' && Number(value) === 0) return 'api/products';

      return `api/products?${filterBy}=${value}`;
    }

    return 'api/products';
  })();

  const { data, error, mutate } = useFetch(linkToApiCall);

  const handleFilterCall = () => {
    const { name, value } = filters.current as Filters;
    router.push(`/home?${name}=${value}`);
  };
  const products: Product[] = data?.data;
  const fabricationYears = [
    ...(new Set(products?.map(product => product.year_fab)) as any),
  ].sort();

  const FilterModal = () => (
    <Box bg="#FFF" w="100%" boxShadow="md" rounded="md" p={2}>
      <Flex w="100%" mb={2} justify="space-between" p={4}>
        <Select
          placeholder="Modelo"
          variant="flushed"
          width="40%"
          mr={4}
          name="model"
          onChange={handleFilters}
        >
          {data?.data?.length &&
            data.data.map((product: Product) => (
              <option key={product.id} value={product.model}>
                {product.model}
              </option>
            ))}
        </Select>

        <Select
          placeholder="Ano Fabricação"
          variant="flushed"
          width="40%"
          name="year_fab"
          onChange={handleFilters}
        >
          {fabricationYears.length &&
            fabricationYears.map((year, index) => (
              <option key={index + year} value={year}>
                {year}
              </option>
            ))}
        </Select>
      </Flex>
      <Flex w="100%" mb={2} p={4}>
        <Input placeholder="Nome" mt={2} name="name" onChange={handleFilters} />
      </Flex>
      <Flex justify="space-between">
        <Button
          isDisabled={filters.current === null}
          onClick={() => {
            router.push('/home');
            filters.current = null;
          }}
          bg={!!filters.current ? 'tomato' : 'white'}
          color={!!filters.current ? 'white' : 'black'}
        >
          Limpar filtros
        </Button>
        <Button onClick={() => handleFilterCall()}>Filtrar</Button>
      </Flex>
    </Box>
  );

  const FilterIcon = (props: any) => {
    if (showFilterModal) {
      return (
        <Icon {...props}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
        </Icon>
      );
    }

    return (
      <Icon {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </Icon>
    );
  };

  return (
    <Box>
      <Flex h={50} p={2}>
        <Menu />
        <Flex
          w="100%"
          alignItems="center"
          justify="center"
          onClick={() => router.push('/home')}
        >
          <Image size="50px" src="/liconnection.svg" alt="Liconnection" />
          <Text>LiConnection</Text>
        </Flex>
        <Box w={60}>
          <ShoppingBasketOutlinedIcon />
          <Badge colorScheme="green" mt="-30px">
            0
          </Badge>
        </Box>
      </Flex>
      <Flex>
        <Box p={4}>
          <Flex
            alignItems="center"
            onClick={() => setShowFilterModal(prev => !prev)}
            cursor="pointer"
            w="max-content"
            boxShadow="md"
            p={2}
          >
            <FilterIcon />

            <Text ml={4}>Filtros</Text>
          </Flex>
          {showFilterModal && <FilterModal />}
        </Box>
      </Flex>
      <Content>
        {products ? (
          products.map((item: Product) => (
            <ProductItem
              key={item.id}
              group={item.group}
              name={item.name}
              obs={item.obs}
              image={item.image}
              price={item.price}
              size={item.size}
            />
          ))
        ) : (
          <Text>No há produtos a serem mostrados</Text>
        )}
      </Content>
    </Box>
  );
};

export default MobileHome;
