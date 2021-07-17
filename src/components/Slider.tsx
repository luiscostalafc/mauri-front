/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, ButtonGroup } from '@chakra-ui/core';
import React from 'react';
import { AiFillCar } from 'react-icons/ai';
import { FaMotorcycle } from 'react-icons/fa';
import { GiScissors, GiWireframeGlobe } from 'react-icons/gi';
import { GoTools } from 'react-icons/go';
import { GrBike, GrBook } from 'react-icons/gr';

type Options = {
  width?: string;
  height?: number;
  marginTop: number;
  size?: string;
  bg: string;
  hover?: string;
  leftIcon: any;
  variant?: string;
  color?: string;
  justifyContent?: string;
  label: string;
  groupId: number;
};

const options: Options[] = [
  {
    marginTop: 0,
    bg: '#f8f9fa',
    leftIcon: GiWireframeGlobe,
    label: 'Todos',
    groupId: 0,
  },
  {
    marginTop: 1,
    bg: '#ED8936',
    leftIcon: AiFillCar,
    label: 'Auto Peças',
    groupId: 1,
  },
  {
    marginTop: 1,
    bg: '#48BB78',
    leftIcon: FaMotorcycle,
    label: 'Moto Peças',
    groupId: 2,
  },
  {
    marginTop: 1,
    bg: '#E53E3E',
    leftIcon: GrBike,
    label: 'Bicicletas',
    groupId: 3,
  },
  {
    marginTop: 1,
    bg: '#F6E05E',
    leftIcon: GoTools,
    label: 'Ferramentas',
    groupId: 4,
  },
  {
    marginTop: 1,
    bg: '#4299E1',
    leftIcon: GrBook,
    label: 'Livraria',
    groupId: 5,
  },
  {
    marginTop: 1,
    bg: '#B7791F',
    leftIcon: GiScissors,
    label: 'Papelaria',
    groupId: 6,
  },
];

const Slider = (props: any) => {
  return (
    <>
      <Box flex="1" textAlign="left">
        <ButtonGroup spacing={1}>
          {options.map((option, index) => (
            <Button
              key={index}
              _hover={{ bg: option.hover || '#E2E8F0' }}
              width={option.width || '100%'}
              height={option.height || 12}
              size={option.size || 'lg'}
              marginTop={option.marginTop}
              bg={option.bg}
              leftIcon={option.leftIcon}
              variant={option.variant || 'solid'}
              color={option.color || '#2D3748'}
              value={option.groupId}
              justifyContent={option.justifyContent || 'left'}
              {...props}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </>
  );
};

export default Slider;
