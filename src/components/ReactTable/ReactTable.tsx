/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
  useBlockLayout,
} from 'react-table';
import { Box, Text, Button, Flex, Switch } from '@chakra-ui/react';
import { useSticky } from 'react-table-sticky';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { BiExport } from 'react-icons/bi';
import { FaRegEye, FaSort } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { MdEdit } from 'react-icons/md';
import { Pagination } from './Components/Pagination';
import { Checkbox } from './Components/Checkbox';
import { ColumnFilter } from './Components/ColumnFilter';
import { COLUMNS } from './columns';
import { Styles } from './Components/styles';
import AdminLeftMenu from '../Admin/LeftMenu';
import AdminRightMenu from '../Admin/RightMenu';
import Header from '../Header';
import { useWindowSize } from '../../hooks/useWindowSize';

export const ReactTable = ({ products }): JSX.Element => {
  const router = useRouter();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, [products]);
  const { width, height } = useWindowSize();

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
      width: 200,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    selectedFlatRows,
    pageOptions,
    goToPage,
    pageCount,
    state,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useBlockLayout,
    useSticky,
    hooks => {
      hooks.visibleColumns.push(oldColumns => {
        return [
          {
            id: 'actions',
            sticky: 'left',
            maxWidth: 75,
            Header: () => <Text>Acoes</Text>,
            Cell: ({ row }) => {
              return (
                <Box>
                  <Box>
                    <Button bg="#79589f" color="#FFF" px={10} rounded={6}>
                      <Link href={`products/${row.original.id}`}>
                        <FaRegEye />
                      </Link>
                    </Button>
                  </Box>
                  <Box>
                    <Button bg="#79589f" color="#FFF" px={10} rounded={6}>
                      <MdEdit />
                    </Button>
                  </Box>
                </Box>
              );
            },
          },
          {
            id: 'selection',
            sticky: 'left',
            maxWidth: 45,
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox
                style={{ width: 30 }}
                {...row.getToggleRowSelectedProps()}
              />
            ),
          },
          {
            id: 'status',
            maxWidth: 100,
            Header: 'ativo',
            Cell: ({ row }) => (
              <Switch checked={row.original.inactive} size="sm" />
            ),
          },
          ...oldColumns,
        ];
      });
    },
  );

  const { pageIndex } = state;

  const handleExport = async (): Promise<void> => {
    if (!selectedFlatRows.length) {
      alert('Devem ser selecionadas as linhas a serem exportadas');
      return;
    }
    const selectedProductsIds = selectedFlatRows.map(row =>
      String(row.original.id),
    );

    try {
      const res = await fetch(
        `${process.env.POSTGRES_URI}/api/file-exporter/productsById`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: selectedProductsIds }),
        },
      );

      const file = await res.blob();
      const url = window.URL.createObjectURL(file);
      window.open(url);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <>
      <Flex justify="space-between" alignItems="center" h={80} mb={4} px={12}>
        <AdminLeftMenu />
        <Header />
        <AdminRightMenu />
      </Flex>
      <Button
        color="#78529f"
        w="max-content"
        py={4}
        px={8}
        ml={4}
        mb={6}
        _hover={{
          color: '#FFF',
          backgroundColor: '#78529f',
          borderRadius: 8,
        }}
        onClick={handleExport}
      >
        Exportar <BiExport style={{ marginLeft: 10 }} />
      </Button>
      <Button
        color="#4ea269"
        w="max-content"
        py={4}
        px={12}
        ml={12}
        mb={6}
        _hover={{
          color: '#FFF',
          backgroundColor: '#4ea269',
          borderRadius: 8,
        }}
        onClick={() => router.push(`products/create`)}
      >
        Criar
      </Button>
      <Button
        color="#4ea269"
        w="max-content"
        py={4}
        px={12}
        ml={4}
        mb={6}
        _hover={{
          color: '#FFF',
          backgroundColor: '#4ea269',
          borderRadius: 8,
        }}
        onClick={() => router.push(`products/excel`)}
      >
        Inserção via Excel
      </Button>

      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{
            width: width - 80,
            height: height - 200,
            backgroundColor: '#fff',
          }}
        >
          <div className="header">
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="tr"
                key={`${Date.now()}-${Math.floor(Math.random() + 1)}`}
              >
                {headerGroup.headers.map(column => {
                  return (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="th"
                      key={`${Date.now()}-${Math.floor(Math.random() + 1)}`}
                    >
                      <Flex mt={4} mb={4} justify="center">
                        {column.render('Header')}
                        {column.canSort ? (
                          column.isSorted ? (
                            column.isSortedDesc ? (
                              <TiArrowSortedDown
                                style={{ transform: 'translate(12px, 0)' }}
                              />
                            ) : (
                              <TiArrowSortedUp
                                style={{ transform: 'translate(12px, 0)' }}
                              />
                            )
                          ) : (
                            <FaSort
                              style={{ transform: 'translate(12px, 0)' }}
                            />
                          )
                        ) : null}
                      </Flex>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  );
                })}
              </tr>
            ))}
          </div>
          <div {...getTableBodyProps()} className="body">
            {page.map(row => {
              prepareRow(row);
              return (
                <div
                  {...row.getRowProps()}
                  className="tr"
                  key={`${Date.now()}-${Math.floor(Math.random() + 1)}`}
                >
                  {row.cells.map(cell => (
                    <div
                      {...cell.getCellProps()}
                      className="td"
                      key={`${Date.now()}-${Math.floor(Math.random() + 1)}`}
                    >
                      {cell.render('Cell')}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Styles>
      <Pagination
        {...{
          canNextPage,
          canPreviousPage,
          goToPage,
          nextPage,
          pageCount,
          pageIndex,
          pageOptions,
          previousPage,
        }}
      />
    </>
  );
};
