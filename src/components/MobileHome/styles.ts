import styled from 'styled-components';
import { Button } from '@chakra-ui/core';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
`;
export const Header = styled.header`
  width: 100%;
  height: 10vh;
  display: flex;
  position: sticky;
  padding: 0;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 20px;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.2);

  .menu {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .logo {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
