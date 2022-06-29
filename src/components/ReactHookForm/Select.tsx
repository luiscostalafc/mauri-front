import { Box, Select as SelectChakra, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdArrowDropDown } from 'react-icons/md';
import { Field } from '../../pages/admin/products/create';

interface iSelectProps {
  productField: Field;
}

export const Select = ({ productField }: iSelectProps) => {
  const { register } = useFormContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      fontWeight="bold"
      fontSize={12}
      mx={6}
      mb={2}
      w="200px"
      maxW="200px"
    >
      <Text>{productField.label}</Text>
      <SelectChakra
        ref={register()}
        name={productField.name}
        w="200px"
        maxW="200px"
        h="40px"
        borderRadius="6px"
        border="1px solid #cecece"
        outline="none"
        bg="#fff"
      >
        {productField.values.map(({ value, option }) => (
          <option key={value} value={value}>
            {option}
          </option>
        ))}
      </SelectChakra>
    </Box>
  );
};
