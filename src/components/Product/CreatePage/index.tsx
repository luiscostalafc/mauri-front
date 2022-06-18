import { Box, Button, Heading } from '@chakra-ui/core';
import { DeleteIcon } from '@chakra-ui/icons';

export * from './Aplicacoes.section';
export * from './Descricao.section';
export * from './Especificacoes.section';
export * from './Fornecedores.section';

export const Header = ({ children }) => (
  <Box mt={4} w="100vw" color="#000" pl={2} mb={2}>
    <Heading fontSize={16}>{children}</Heading>
  </Box>
);

type ActionButtonProps = {
  onClick(): void;
  action: 'ADD' | 'REMOVE';
};
export const ActionButton = ({ onClick, action }: ActionButtonProps) => (
  <Button
    px={action === 'ADD' ? 8 : 4}
    mt={2}
    borderRadius={4}
    border="2px solid lightblue"
    variant="outline"
    onClick={onClick}
  >
    {action === 'ADD' ? 'Adicionar' : <DeleteIcon />}
  </Button>
);
