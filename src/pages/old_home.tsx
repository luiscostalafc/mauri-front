/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Image } from '@chakra-ui/core';
import { useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartHeader from '../components/CartHeader';
import AutoExpandMenu from '../components/ExpandMenu/AutoExpandMenu';
import Footer from '../components/Footer/index';
// import Group from '../../src/components/Group'
import Header from '../components/Header';
import ProductContent from '../components/Product/ProductContent';
import LeftMenu from '../components/TemplateGeneral/LeftMenu';
import RightMenu from '../components/TemplateGeneral/RightMenu';
import Slider from '../components/TemplateGeneral/Slider';
import MobileHomeHeader from '../components/MobileHome';

export default function Index() {
  const router = useRouter();
  const [group, setGroup] = useState(0);

  const [isMinorThanThan900] = useMediaQuery('(max-width: 900px)');

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

  if (isMinorThanThan900) {
    return <MobileHomeHeader />;
  }

  return (
    <Container fluid>
      <Row>
        {/* Logo */}
        <Col xs={12} md={3} lg={3}>
          <Image size="70%" src="/liconnection.svg" alt="Liconnection" />
        </Col>
        {/* header */}
        <Col xs={12} md={6} lg={6}>
          {!isMinorThanThan900 && <Header />}
        </Col>
        {/* logoR */}
        <Col xs={12} md={3} lg={3}>
          <CartHeader />
        </Col>
      </Row>
      <Row>
        {/*  menuL */}
        <Col xs={3} md={3} lg={3}>
          <LeftMenu />
        </Col>
        {/* filter */}
        <Col xs={12} md={6} lg={6}>
          <AutoExpandMenu group={group} onSearch={handleProduct} />
        </Col>
        {/* menuR */}
        <Col xs={3} md={3} lg={3} xl={3}>
          <RightMenu />
        </Col>
      </Row>
      <Row>
        {/*  slider */}
        <Col xs={0} md={3} lg={3}>
          <Slider
            onClick={(e: { target: { value: number } }) => {
              // handleClick(e.target.value)
              const value = Number(e.target.value);
              setGroup(value);
              if (value === 0) router.push(`/home`);
              else router.push(`/home?group_id=${value}`);
            }}
          />
        </Col>
        {/* products */}
        <Col xs={12} sm={2} md={9} lg={8} xl={9}>
          <ProductContent />
        </Col>
        {/* grupo? */}
        <Col xs={0} md={3} lg={3} sm={1}></Col>
      </Row>
      <Row>
        {/* footer */}
        <Col
          xs={12}
          md={{ span: 4, offset: 4 }}
          lg={{ span: 4, offset: 4 }}
          sm={1}
        >
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
