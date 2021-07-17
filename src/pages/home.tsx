/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Image } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartHeader from '../components/CartHeader';
import AutoExpandMenu from '../components/ExpandMenu/AutoExpandMenu';
import Footer from '../components/Footer';
// import Group from '../../src/components/Group'
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import ProductContent from '../components/Product/ProductContent';
import RightMenu from '../components/RightMenu';
import Slider from '../components/Slider';

export default function Index() {
  const router = useRouter();
  // const [transform, setTransform] = useState('scaleX(0)')
  const [group, setGroup] = useState(0);

  function handleProduct(filter: any) {
    const queryParams = new URLSearchParams(filter).toString();
    router.push({ pathname: router.pathname, query: queryParams });
  }

  function handleClick(e: number) {
    if (Number(e) === 0) {
      router.push('/home');
      return;
    } 
    setGroup(e);
    router.push({ pathname: '/home', query: { group_id: e } });
  }

  return (
    <Container fluid>
      <Row>
        {/* Logo */}
        <Col xs={0} md={3} lg={3}>
          <Image size="70%" src="/liconnection.svg" alt="Liconnection" />
        </Col>
        {/* header */}
        <Col xs={12} md={6} lg={6}>
          <Header />
        </Col>
        {/* logoR */}
        <Col xs={0} md={3} lg={3}>
          <CartHeader />
        </Col>
      </Row>
      <Row>
        {/*  menuL */}
        <Col xs={0} md={3} lg={3}>
          <LeftMenu />
        </Col>
        {/* filter */}
        <Col xs={12} md={6} lg={6}>
          <AutoExpandMenu
            group={group}
            /* transform={transform} */ onSearch={handleProduct}
          />
        </Col>
        {/* menuR */}
        <Col xs={0} md={3} lg={3}>
          <RightMenu />
        </Col>
      </Row>
      <Row>
        {/*  slider */}
        <Col xs={0} md={3} lg={3}>
          <Slider
            onClick={(e: { target: { value: number } }) =>
              handleClick(e.target.value)
            }
          />
        </Col>
        {/* products */}
        <Col xs={12} md={6} lg={6}>
          <ProductContent />
        </Col>
        {/* grupo? */}
        <Col xs={0} md={3} lg={3}></Col>
      </Row>
      <Row>
        {/* footer */}
        <Col xs={12} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }}>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
