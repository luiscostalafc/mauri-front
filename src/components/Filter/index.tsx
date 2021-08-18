import { Select } from '@chakra-ui/core';
import React from 'react';

const Filter: React.FC = () => {
  return (
    <>
      <Select
        color="gray.500"
        marginBottom={1}
        variant="filled"
        placeholder="Posição"
      >
        <option value="super">superior</option>
        <option value="bottom">inferior</option>
      </Select>
      <Select
        color="gray.500"
        marginBottom={1}
        variant="filled"
        placeholder="Sistema"
      >
        <option value="alarm">alarme</option>
      </Select>
      <Select
        color="gray.500"
        marginBottom={1}
        variant="filled"
        placeholder="Material"
      >
        <option value="acrylic">Acrílico</option>
      </Select>
      <Select
        color="gray.500"
        marginBottom={1}
        variant="filled"
        placeholder="Cor"
      >
        <option value="red">vermelho</option>
        <option value="blue">azul</option>
        <option value="white">branco</option>
        <option value="green">verde</option>
        <option value="yellow">amarelo</option>
      </Select>
      <Select
        color="gray.500"
        marginBottom={1}
        variant="filled"
        placeholder="Medida"
      >
        <option value="25mm">0,25mm</option>
        <option value="50mm">0,50mm</option>
        <option value="75mm">0,75mm</option>
        <option value="100mm">1,00mm</option>
        <option value="125mm">1,25mm</option>
        <option value="150mm">1,50mm</option>
        <option value="175mm">1,75mm</option>
        <option value="200mm">2,00mm</option>
      </Select>
      <Select color="gray.500" variant="filled" placeholder="Qualidade">
        <option value="similar">Similar</option>
        <option value="original">Original</option>
      </Select>
    </>
  );
};

export default Filter;
