import React from 'react';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';

interface Props {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: any;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  pageCount: number;
}
export const Pagination: React.FC<Props> = ({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  previousPage,
  nextPage,
  goToPage,
  pageCount,
}): JSX.Element => {
  return (
    <Flex ml={20} justify="center" alignItems="center">
      {/* voltar paga primeira pagina */}
      <Button
        w={30}
        h={30}
        disabled={!canPreviousPage}
        _hover={{ backgroundColor: '#c2c2c2' }}
        onClick={() => goToPage(0)}
      >
        <MdSkipPrevious />
      </Button>

      {/* voltar uma pagina */}
      <Button
        w={30}
        h={30}
        disabled={!canPreviousPage}
        _hover={{ backgroundColor: '#c2c2c2' }}
        onClick={() => previousPage()}
      >
        <GrPrevious />
      </Button>
      <Text mx={10}>
        {pageIndex + 1}/{pageOptions.length}
      </Text>

      {/* se tiver mais de 3 paginas, podera selecionar a pagina destino */}
      {pageCount > 3 ? (
        <>
          <Text mr={4}>Ir para pagina</Text>
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            w={40}
            onChange={e => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              goToPage(pageNumber);
            }}
          />
        </>
      ) : null}

      {/* avancar uma pagina */}
      <Button
        w={30}
        h={30}
        disabled={!canNextPage}
        _hover={{ backgroundColor: '#c2c2c2' }}
        onClick={() => nextPage()}
      >
        <GrNext />
      </Button>

      {/* ir para ultima pagina */}
      <Button
        w={30}
        h={30}
        disabled={!canNextPage}
        _hover={{ backgroundColor: '#c2c2c2' }}
        onClick={() => goToPage(pageCount - 1)}
      >
        <MdSkipNext />
      </Button>
    </Flex>
  );
};
