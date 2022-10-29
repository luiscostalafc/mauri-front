import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Template from '../../../../components/Admin';
import AdminMenu from '../../../../components/Admin/Menu';

export default function Details() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { id } = router.query;
      const res = await fetch(
        `${process.env.BACKEND_URL}/order-details/search/${id}`,
      );
      const data = await res.json();

      if (data) {
        setData(data);
      }
    }
    getData();
  }, []);

  const orderStatuses = {
    pending: {
      bg: 'orange',
      text: 'Pendente',
    },
    approved: {
      bg: 'green',
      text: 'Aprovada',
    },
    failure: {
      bg: 'red',
      text: 'Falha',
    },
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
      {data.length ? (
        <div
          style={{
            backgroundColor: orderStatuses[data[0].order_status].bg,
            width: 'max-content',
            padding: 5,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text>{orderStatuses[data[0].order_status].text}</Text>
        </div>
      ) : null}
      <br />
      <Flex flexDir="row" width="100%">
        {data.length ? (
          <table style={{ width: '100%' }}>
            <th>Método de pagamento</th>
            <th>Produto</th>
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
                  <Text>{item.payment_method}</Text>
                </TableData>
                <TableData>
                  <Text>{item.product_name}</Text>
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
