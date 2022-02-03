/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { useCartStore } from '../../stores/cartStore';
import { Cart, Container } from './styles';

const CartHeader: React.FC = () => {
  const products = useCartStore(state => state.products.length);
  const label = products === 1 ? 'Item' : 'Itens';
  return (
    <Container>
      <Cart href="/users/cart">
        <a>
          <div>
            <strong>Meu carrinho</strong>
            <span style={{ marginLeft: 10 }}>
              {products} {label}
            </span>
          </div>
          <MdShoppingBasket size={36} color="#ff9000" />
        </a>
      </Cart>
    </Container>
  );
};

export default CartHeader;
