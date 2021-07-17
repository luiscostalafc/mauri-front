/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, ButtonGroup } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
// import { Container } from './styles';

const DashboardAdminButtons: React.FC = () => {
  function convertArrayOfObjectsToCSV(array: any[]) {
    let result: string;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item: { [x: string]: string }) => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array: any) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    // link.click();
  }

  // const Export = ({ onExport }: any) => (
  //   <Button onClick={e => onExport(e?.target?.value ?? '')}>Export</Button>
  // );

  function importRequests(value: any) {
    console.log(value);
  }
  function exportRequests(value: any) {
    console.log(value);
  }
  function pressRequests(value: any) {
    console.log(value);
  }
  function formatRequests(value: any) {
    console.log(value);
  }

  // const actionsMemo = React.useMemo(() => downloadCSV(data), []);
  return (
    <ButtonGroup variant="outlined">
      <Link href="/admin">
        <Button size="large" type="button">
          Preparando
        </Button>
      </Link>
      <Link href="/admin/dashboard/ready-to-send">
        <Button size="large" type="button">
          Pronto para enviar
        </Button>
      </Link>
      <Link href="/admin/dashboard/in-transit">
        <Button size="large" type="button">
          Em Trânsito
        </Button>
      </Link>
      <Link href="/admin/dashboard/canceled">
        <Button size="large" type="button">
          Canceladas
        </Button>
      </Link>
      <Link href="/admin/dashboard/completed">
        <Button size="large" type="button">
          Concluídas
        </Button>
      </Link>
      <Link href="/admin/dashboard/assurance">
        <Button size="large" type="button">
          Garantia
        </Button>
      </Link>
      <Button size="large" type="button" onClick={importRequests}>
        Importar Pedidos
      </Button>
      <Button size="large" type="button" onClick={exportRequests}>
        Exportar Pedidos
      </Button>
      <Button size="large" type="button" onClick={pressRequests}>
        Imprimir Pedido
      </Button>
      <Button size="large" type="button" onClick={formatRequests}>
        Formato etiqueta
      </Button>
    </ButtonGroup>
  );
};

export default DashboardAdminButtons;
