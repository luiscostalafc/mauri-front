/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line prettier/prettier
import React from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';

import { Container, ProductTable, Total } from '../../styles/pages/cart';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface CartProductProps {
  product: Product;
}

const Cart: React.FC<CartProductProps> = ({ product }) => {
  const { cart, removeProduct, updateProductQuantity } = useCart();

  const cartFormatted =
    !!cart?.length &&
    cart.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.price * product.quantity),
    }));

  const total =
    !!cart?.length &&
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.quantity;
      }, 0),
    );

  function handleProductIncrement(product: Product) {
    updateProductQuantity({
      productId: product.id,
      quantity: product.quantity + 1,
    });
  }

  function handleProductDecrement(product: Product) {
    updateProductQuantity({
      productId: product.id,
      quantity: product.quantity - 1,
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

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
          {!!cartFormatted &&
            cartFormatted.map(product => (
              <tr>
                <td>
                  <img src={product.image ?? ''} alt={product.title ?? ''} />
                </td>
                <td>
                  <strong>{'Nome do produto'}</strong>
                  <span>{product.price ?? 100}</span>
                </td>

                <td>
                  <div>
                    <button
                      disabled={product.quantity <= 1}
                      type="button"
                      onClick={() => handleProductDecrement(product)}
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
                      onClick={() => handleProductIncrement(product)}
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
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} color="#ff9000" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={() => {}}>
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
