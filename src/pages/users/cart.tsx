/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line prettier/prettier
import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCartStore } from '../../stores/cartStore';

import { Container, ProductTable, Total } from '../../styles/pages/cart';
import { Product } from '../../types';

interface CartProductProps {
  product: Product;
}

const Cart: React.FC<CartProductProps> = () => {
  const { increment, decrement, removeProduct } = useCartStore(state => state);
  const products = useCartStore(state => state.products);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    products.forEach(p => {
      sum += parseInt(p.price) * (p.quantity || 1);
    });
    setTotal(sum);
  }, [products]);

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th>Produto</th>
            <th>QTDE</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.length
            ? products.map(product => (
                <tr key={product.id}>
                <td>
                    <img src={product.image ?? ''} alt={product.title ?? ''} />
                  </td>
                <td>
                    <strong>{product.name}</strong>
                    <span>{product.price ?? 100}</span>
                  </td>

                <td>
                    <div>
                    <button
                        disabled={product.quantity <= 1}
                        type="button"
                        onClick={() => decrement(product.id)}
                      >
                        <MdRemoveCircleOutline size={20} color="#ff9000" />
                      </button>
                    <input
                        type="text"
                        readOnly
                        value={product.quantity ?? ''}
                      />
                    <button
                        type="button"
                        onClick={() => increment(product.id)}
                      >
                        <MdAddCircleOutline size={20} color="#ff9000" />
                      </button>
                  </div>
                  </td>
                <td>
                    <strong>{product.subTotal ?? 200}</strong>
                  </td>
                <td>
                    <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                  >
                    <MdDelete size={20} color="#ff9000" />
                  </button>
                  </td>
              </tr>
              ))
            : null}
          {!products.length && (
            <Heading marginTop={22}>
              Não encontramos nenhum produto em seu carrinho.
            </Heading>
          )}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={() => {}} disabled={!products.length}>
          Finalizar pedido
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>{total ?? 1000}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
