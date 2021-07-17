/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { Cart, Container } from './styles';

const CartHeader: React.FC = () => {
  return (
    <Container>
      <Cart href="/users/cart">
        <a>
          <div>
            <strong>Meu carrinho</strong>
            <span> itens</span>
          </div>
          <MdShoppingBasket size={36} color="#ff9000" />
        </a>
      </Cart>
    </Container>
  );
};

export default CartHeader;
