/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

type Options = {
  value: string | number | readonly string[] | undefined;
  label: string;
};

type QueryObject = { [key: string]: string };

const positions: Options[] = [
  { value: 'super', label: 'superior' },
  { value: 'bottom', label: 'inferior' },
];
const systems: Options[] = [{ value: 'alarm', label: 'alarme' }];
const materials: Options[] = [{ value: 'acrylic', label: 'Acrílico' }];
const colors: Options[] = [
  { value: 'red', label: 'vermelho' },
  { value: 'blue', label: 'azul' },
  { value: 'white', label: 'branco' },
  { value: 'green', label: 'verde' },
  { value: 'yellow', label: 'amarelo' },
];
const widths: Options[] = [
  { value: '25mm', label: '0,25mm' },
  { value: '50mm', label: '0,50mm' },
  { value: '75mm', label: '0,75mm' },
  { value: '100mm', label: '1,00mm' },
  { value: '125mm', label: '1,25mm' },
  { value: '150mm', label: '1,50mm' },
  { value: '175mm', label: '1,75mm' },
  { value: '200mm', label: '2,00mm' },
];
const qualities: Options[] = [
  { value: 'similar', label: 'Similar' },
  { value: 'original', label: 'Original' },
];

const ProductFilter = ({ group, onSearch, ...props }: any) => {
  const router = useRouter();
  const [selectedGroup, setGroup] = useState(1);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    setGroup(group);
  }, [group]);

  function hasInGroup(values: number[]) {
    return values.indexOf(Number(selectedGroup)) !== -1;
  }

  const handleChange = (event: any) => {
    if (event?.target?.name) {
      const { name, value: queryValue } = event.target;
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.append(name, queryValue);
      const query: QueryObject = {};
      const params = (urlParams as unknown) as Array<string[]>;
      for (const [key, value] of params) {
        query[key] = value;
      }
      router.push({ pathname: router.pathname, query });
      // const auxValues: any = { ...filter };
      // const { name } = event.target;
      // auxValues[name] = event.target.value;
      // setFilter(auxValues);
    }
  };

  return (
    <Flex
      backgroundColor="transparent"
      paddingLeft={5}
      flexDirection="column"
      position="relative"
    >
      <Box
        display="fixed"
        marginLeft={220}
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        <Button
          children
          onClick={() => onSearch(filter)}
          size="md"
          leftIcon={FaSearch}
        />
      </Box>
      <Box
        display="fixed"
        marginLeft={220}
        width="111px"
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        {/* {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            marginBottom={1}
            variant="filled"
            placeholder="Posição"
            name="position"
            onChange={handleChange}
          >
            {positions.length &&
              positions.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )}
        {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            marginBottom={1}
            variant="filled"
            placeholder="Sistema"
            name="system"
            onChange={handleChange}
          >
            {systems.length &&
              systems.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )}
        {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            marginBottom={1}
            variant="filled"
            placeholder="Material"
            name="material"
            onChange={handleChange}
          >
            {materials.length &&
              materials.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )}
        {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            marginBottom={1}
            variant="filled"
            placeholder="Cor"
            name="color"
            onChange={handleChange}
          >
            {colors.length &&
              colors.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )}
        {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            marginBottom={1}
            variant="filled"
            placeholder="Medida"
            name="width"
            onChange={handleChange}
          >
            {widths.length &&
              widths.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )}
        {hasInGroup([1, 2]) && (
          <Select
            color="primary"
            variant="filled"
            placeholder="Qualidade"
            name="quality"
            onChange={handleChange}
          >
            {qualities.length &&
              qualities.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
          </Select>
        )} */}
      </Box>
    </Flex>
  );
};

export default ProductFilter;
