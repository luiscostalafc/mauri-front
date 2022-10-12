import { Flex, Button, Grid, GridItem, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Headroom from 'react-headroom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Product } from '../components/Product';
import LeftMenu from '../components/TemplateGeneral/LeftMenu';
import RightMenu from '../components/TemplateGeneral/RightMenu';
import { useCartStore } from '../stores/cartStore';

const seguimentos = [
  'Auto Peças',
  'Moto Peças',
  'Bicicletas',
  'Ferramentas',
  'Livraria',
  'Papelaria',
  'Mais...',
];

export default function Home(): JSX.Element {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [seguimentoSelecionado, setSeguimentoSelecionado] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const res = await fetch(
          `${process.env.POSTGRES_URI}/api/products${
            seguimentoSelecionado ? `?seguimento=${seguimentoSelecionado}` : ''
          }`,
        );
        const productsResponse = await res.json();
        setProducts(productsResponse);
      } finally {
        setloading(false);
      }
    })();
  }, [seguimentoSelecionado]);
  return (
    <Grid templateColumns=".4fr 2fr" gap={4} p={12}>
      <HeaderCustom />
      <Flex flexDirection="column" w="80">
        {seguimentos.map(g => (
          <Button
            key={g}
            variant="outlined"
            w="80"
            h="40"
            borderRadius={6}
            mb={4}
            color="#302b2b"
            border="1px solid teal"
            onClick={() => {
              if (g === seguimentoSelecionado) return;
              setSeguimentoSelecionado(g);
            }}
          >
            {g}
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
          onClick={() => setSeguimentoSelecionado('')}
        >
          Todos
        </Button>
      </Flex>

      <Flex flexWrap="wrap">
        {products.length && !loading
          ? products.map(product => (
              <Product product={product} key={product.id} />
            ))
          : null}

        {!loading && !products.length ? (
          <Text mt={8} ml={8}>
            Nenhum produto encontrado
          </Text>
        ) : null}

        {loading ? <h1>Carregando...</h1> : null}
      </Flex>
      <GridItem colSpan={3}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

const HeaderCustom = (): JSX.Element => {
  const router = useRouter();
  const cartProducts = useCartStore(store => store.products);
  return (
    <GridItem colSpan={4} bg="#FFF" zIndex={10000} height="15vh">
      <Headroom>
        <Flex
          display="flex"
          justify="space-between"
          alignItems="center"
          h={80}
          mb={16}
          px={12}
        >
          <LeftMenu />
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
          <RightMenu />
        </Flex>
      </Headroom>
    </GridItem>
  );
};
