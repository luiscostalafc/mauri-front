/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Flex,
  Button,
  Grid,
  GridItem,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AdminLeftMenu from '../components/Admin/LeftMenu';
import AdminRightMenu from '../components/Admin/RightMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import Group from '../../src/components/Group'

import { Product } from '../components/Product';
import LeftMenu from '../components/TemplateGeneral/LeftMenu';
import RightMenu from '../components/TemplateGeneral/RightMenu';
import { useCartStore } from '../stores/cartStore';

export default function Home({ products, groups }) {
  const groupsParse = groups.map(g => ({ id: g.id, group: g.group }));
  const router = useRouter();
  const cartProducts = useCartStore(store => store.products);
  return (
    <Grid templateColumns=".7fr 2fr" gap={4} p={12}>
      <GridItem
        colSpan={4}
        position="sticky"
        top={0}
        bg="#FFF"
        pb={6}
        zIndex={10000}
        h="20vh"
      >
        <Flex
          display="flex"
          justify="space-between"
          alignItems="center"
          h={80}
          mb={16}
          px={12}
        >
          <Box h="10vh">
            <Image size="50%" src="/liconnection.svg" alt="Liconnection" />

            <LeftMenu />
          </Box>
          <Flex>
            <Header />
            <Flex
              p={6}
              _hover={{ cursor: 'pointer' }}
              onClick={() => router.push('/users/cart')}
            >
              <ShoppingCartIcon /> {cartProducts.length}
            </Flex>
          </Flex>
          <Flex>
            <RightMenu />
          </Flex>
        </Flex>
      </GridItem>
      <Flex flexDirection="column" w="80">
        {groupsParse.map(g => (
          <Button
            key={g.id}
            variant="outlined"
            w="80"
            h="40"
            borderRadius={6}
            mb={4}
            color="#302b2b"
            border="1px solid teal"
            onClick={() => router.push(`home?group_id=${g.id}`)}
          >
            {g.group}
          </Button>
        ))}
        <Button
          variant="outlined"
          w="80"
          h="40"
          borderRadius={6}
          mb={4}
          color="#302b2b"
          border="1px solid teal"
          onClick={() => router.push(`home`)}
        >
          Todos
        </Button>
      </Flex>

      <Flex flexWrap="wrap">
        {products.length ? (
          products.map(product => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <Text mt={8} ml={8}>
            Nenhum produto encontrado
          </Text>
        )}
      </Flex>
      <GridItem colSpan={3}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

Home.getInitialProps = async ({ query }) => {
  const uri = new URLSearchParams(query);
  const [res, resGroups] = await Promise.all([
    fetch(`${process.env.POSTGRES_URI}/api/products?${uri}`),
    fetch(`${process.env.POSTGRES_URI}/api/groups`),
  ]);
  const [products, { data: groups }] = await Promise.all([
    res.json(),
    resGroups.json(),
  ]);
  return {
    products,
    groups,
  };
};
