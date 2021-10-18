/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import { Flex, Spinner } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import { api } from '../../services/API/index';
import styles from '../../styles/pages/styles.module.css';
import { sizeProductsExample } from '../../utils/sizeProductsExample';
import ProductLoading from './loading';
import ProductItem from './ProductItem';

interface ImageProduct {
  asset: object | string;
  mine: object | string;
  path: object | string;
}

interface ProductItemProps {
  id?: string | any;
  group?: string | any;
  group_id?: number;
  subgroup?: string;
  name?: string;
  automaker?: string; // montadora
  model?: string; // modelo
  year_start?: string; // ano-fab
  year_end?: string; // ano-mod
  engine?: string; // motor
  type?: string; // combust.
  complement?: string; // chassi
  obs?: string; // descrição
  price?: number; // valor
  image?: ImageProduct | any;
  size?: string | any;
}

const ProductContent: React.FC<ProductItemProps> = () => {
  const router = useRouter();
  const queryParams = router.query;

  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, mutate, isValidating } = useSWR('api/products', api.get);
  const [dataProducts, setDataProducts] = useState<ProductItemProps[]>([]);

  useEffect(() => {
    async function dataProductsApi(queryParams: any) {
      const query = new URLSearchParams(queryParams).toString();
      const URL = query ? `api/products?${query}` : 'api/products';
      const { data } = await api.get(URL, { debug: true });
      setDataProducts(data as SetStateAction<ProductItemProps[]>);
    }

    dataProductsApi(queryParams);
  }, [queryParams]);

  function handlePageClick({ selected: selectedPage }: any) {
    setCurrentPage(selectedPage);
  }

  const maxPage = 9;
  const offset = currentPage * maxPage;

  const currentPageData = !!dataProducts?.length
    ? dataProducts.slice(offset, offset + maxPage).map(item => (
        <Flex flex={1} alignItems="center" justifyContent="center">
          <ProductItem
            key={item.id}
            group={item.group}
            name={item.name}
            obs={item.obs}
            image={item.image}
            price={item.price}
            size={
              sizeProductsExample &&
              sizeProductsExample.map(sizeProduct => sizeProduct.name)
            }
          />
        </Flex>
      ))
    : 'Não há produtos para exibir';

  const pageCount = Math.ceil(dataProducts?.length / maxPage);

  useEffect(() => {
    mutate();
  }, [mutate, queryParams]);

  if (error)
    return (
      <div>
        Ocorreu algum erro ao carregar os produtos verifique sua conexão ou
        atualize a página
      </div>
    );
  if (!data) return <ProductLoading />;

  return (
    <>
      {isValidating && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.300"
          size="xl"
        />
      )}

      {!isValidating && (
        <>
          <Flex flexDir="row" maxWidth="90%" wrap="wrap" marginTop="50px">
            {currentPageData}
          </Flex>

          <Flex flexDirection="column">
            <ReactPaginate
              pageCount={10}
              pageRangeDisplayed={pageCount ?? 1}
              marginPagesDisplayed={pageCount ?? 1}
              previousLabel="← Previous"
              nextLabel="Next →"
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              previousLinkClassName={styles.pagination__link}
              nextLinkClassName={styles.pagination__link}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default ProductContent;
