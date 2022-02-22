import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Template from '../../../../components/Admin';
import AdminMenu from '../../../../components/Admin/Menu';

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POSTGRES_URI}/order-details/search/${id}`,
      );
      const data = await res.json();

      if (data) {
        setData(data);
      }
    }

    getData();
  }, []);

  const orderStatuses = {
    pending: 'Pendente',
    approved: 'Aprovada',
    failure: 'Falha',
  };

  const TableData = ({ children }) => (
    <td
      style={{
        color: '#696969',
        padding: 20,
        marginTop: 20,
      }}
    >
      {children}
    </td>
  );

  return (
    <Template slider={<AdminMenu />} group={<></>} flexDir="column">
      <Heading>Detalhes do Pedido</Heading>
      <br />
      <Flex flexDir="row" width="100%">
        {data ? (
          <table style={{ width: '100%' }}>
            <th>Status Ordem</th>
            <th>Método de pagamento</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Comprador</th>
            {data.map((item, index) => (
              <tr
                style={{
                  marginTop: 30,
                  borderRadius: 8,
                  height: 48,
                  backgroundColor: index % 2 === 0 ? '' : '#e3e3e3',
                }}
              >
                <TableData>
                  <Text>{orderStatuses[item.order_status] || '-'}</Text>
                </TableData>

                <TableData>
                  <Text>{item.payment_method}</Text>
                </TableData>
                <TableData>
                  <Text>R$ {item.price}</Text>
                </TableData>
                <TableData>
                  <Text>{item.quantity}</Text>
                </TableData>
                <TableData>
                  <Text>{item.complete_name}</Text>
                </TableData>
              </tr>
            ))}
          </table>
        ) : null}
      </Flex>
    </Template>
  );
}
