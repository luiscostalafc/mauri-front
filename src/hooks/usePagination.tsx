/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

interface ProductItemProps {
  id?: number;
  group?: string;
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
  formattedPrice?: number; // valor
  image?: ImageProduct[];
}

interface ImageProduct {
  asset?: string;
  mine?: string;
  path?: string;
}

export function usePagination(data: ProductItemProps[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data?.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data?.slice(undefined, end);
  }

  function next() {
    setCurrentPage(currPage => Math.min(currPage + 1, maxPage));
  }

  return { next, currentData, currentPage, maxPage };
}
