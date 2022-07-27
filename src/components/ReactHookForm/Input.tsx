import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
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

export const Input = ({
  label,
  name,
  defaultValue,
}: InputProps): JSX.Element => {
  const { register } = useFormContext();
  const isId = name === 'idInterno';
  const shouldDisplayId = !!defaultValue;
  return (
    <Box display="flex" flexDirection="column" mx={6} mb={2} maxW="200px">
      <Text fontSize={12} fontWeight="bold">
        {label}
      </Text>
      <InputStyled
        name={name}
        disabled={isId}
        isId={isId}
        defaultValue={isId && !shouldDisplayId ? 'Automático' : defaultValue}
        {...register(name)}
      />
    </Box>
  );
};
