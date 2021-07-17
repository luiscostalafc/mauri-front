import { Select } from '@chakra-ui/core';
import React from 'react';
import Card from './Card/Card';
import Table from './Table/Table';

const ProductList: React.FC = () => (
  <Card>
    <Table>
      <Table.THead>
        <Table.THead.TR>
          <Table.THead.TH>Montadora</Table.THead.TH>
          <Table.THead.TH>Modelo</Table.THead.TH>
          <Table.THead.TH>Ano-Fab</Table.THead.TH>
          <Table.THead.TH>Ano-Mod</Table.THead.TH>
          <Table.THead.TH>Motor</Table.THead.TH>
          <Table.THead.TH>Combustível</Table.THead.TH>
          <Table.THead.TH>N°Chassi</Table.THead.TH>
        </Table.THead.TR>
      </Table.THead>

      <Table.TBody>
        <Table.TBody.TR>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar">
              <option value="Renault">Renault</option>
              <option value="Renault">Mercedes-Benz</option>
              <option value="Renault">BMW</option>
              <option value="Renault">Peugeot</option>
            </Select>
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Select maxWidth={20} size="sm" placeholder="filtrar" />
          </Table.TBody.TD>
        </Table.TBody.TR>
      </Table.TBody>
    </Table>
  </Card>
);

export default ProductList;
