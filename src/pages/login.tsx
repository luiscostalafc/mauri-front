/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text } from '@chakra-ui/core';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BoxLogin from '../components/BoxLogin/Index';

export default function Login() {
  return (
      <Container fluid>
        <Row >
          <Col xs={12} md={{ span: 4, offset: 4}} lg={{ span: 4, offset: 4 }}>
            <Text fontSize="50px" color="tomato" style={{padding: '50px'}}>
              Login
            </Text>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <BoxLogin
              route="/users/sign-in"
              color="tomato"
              title="Já tenho cadastro"
              subtitile="Informe seu e-mail e senha para se autenticar"
              buttonLabel="ACESSAR"
            />          
          </Col>
          <Col xs={12} md={6} lg={6}>
            <BoxLogin
              route="/users/sign-up"
              color="grey"
              title="Sou novo cliente"
              subtitile="O cadastro em nossa loja é simples e rápido"
              buttonLabel="CRIAR CONTA"
            />          
          </Col>
        </Row>
      </Container>
  );
}
