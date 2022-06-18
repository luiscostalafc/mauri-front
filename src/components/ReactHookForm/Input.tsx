import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface IInputProps {
  name: string;
  label: string;
  defaultValue?: string;
}
const InputStyled = styled.input<{ isId: boolean }>`
  width: 200px;
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 6px;
  border: ${props => `1px solid ${props.isId ? '#ff0000' : '#cecece'}`};
  outline: none;
  &:focus {
    border: 2px solid rgba(66, 153, 225, 0.6);
  }
`;

export const Input = ({ label, name, defaultValue }: IInputProps) => {
  const { register } = useFormContext();
  const isId = name === 'idInterno';
  return (
    <Box display="flex" flexDirection="column" mx={6} mb={2} maxW="200px">
      <Text fontSize={12} fontWeight="bold">
        {label}
      </Text>
      <InputStyled
        ref={register()}
        name={name}
        disabled={isId}
        isId={isId}
        defaultValue={isId ? 'Automático' : defaultValue}
      />
    </Box>
  );
};
