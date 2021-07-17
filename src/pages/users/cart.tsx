/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  // eslint-disable-next-line prettier/prettier
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { Container, ProductTable, Total } from '../../styles/pages/cart';
import { IProduct } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface CartProductProps {
  product: IProduct;
}

const Cart: React.FC<CartProductProps> = ({ product }) => {
  return (
    <Container>
      <ProductTable key={''}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>QTDE</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={''} alt={''} />
            </td>
            <td>
              <strong>{'Nome do produto'}</strong>
              <span>{formatPrice(100)}</span>
            </td>

            <td>
              <div>
                <button type="button" onClick={() => {}}>
                  <MdRemoveCircleOutline size={20} color="#ff9000" />
                </button>
                <input type="number" readOnly value={'quantidade'} />
                <button type="button" onClick={() => {}}>
                  <MdAddCircleOutline size={20} color="#ff9000" />
                </button>
              </div>
            </td>
            <td>
              <strong>
                {/* {(item.product.price * item.quantity).toFixed(2)} */}
              </strong>
            </td>
            <td>
              <button type="button" onClick={() => {}}>
                <MdDelete size={20} color="#ff9000" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>
      )){' '}
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>{formatPrice(100)}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
