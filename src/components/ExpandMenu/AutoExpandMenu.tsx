/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Automakers from './Filters/Automakers';
import Chassi from './Filters/Chassi';
import Fuel from './Filters/Fuel';
import Models from './Filters/Models';
import Motors from './Filters/Motors';
import Name from './Filters/Name';
import YearFab from './Filters/YearFab';
import YearModel from './Filters/YearModel';

declare interface Params {
  name: string;
  value: string;
}

type QueryObject = { [key: string]: string };

const AutoExpandMenu = ({ group, onSearch, ...props }: any) => {
  const router = useRouter();
  const [selectedGroup, setGroup] = useState(1);
  const [automaker, setAutomaker] = useState('');
  const [defaultAutomaker, setDefaultAutomaker] = useState('');
  const [model, setModel] = useState('');
  const [defaultModel, setDefaultModel] = useState('');
  const [search, setSearch] = useState('');

  let paramsState = ''
  useEffect(() => {
    paramsState = new URLSearchParams(window?.location?.search);
    console.log(paramsState.get('model'),paramsState.get('automaker'))
    if(paramsState.has('model')) setDefaultModel(() => paramsState.get('model'))
    if(paramsState.has('automaker')) setDefaultAutomaker(() => paramsState.get('automaker'))
    setSearch(paramsState)
  }, []);

  useEffect(() => {
    setGroup(group);
  }, [group]);

  function hasInGroup(values: number[]) {
    return values.indexOf(Number(selectedGroup)) !== -1;
  }

  const updateQuery = useCallback(
    ({ name, value }: Params) => {
      if (value) {
        paramsState?.append(name, value);
      } else {
        paramsState?.delete(name);
      }
    },
    [paramsState],
  );

  const clearFilter = useCallback(() => {
    setAutomaker(() => '')
    setModel(() => '')
    router.push('/home');
  },[])

  const mountQuery = useCallback(() => {
    const query: QueryObject = {};
    const params = (paramsState as unknown) as Array<string[]>;
    for (const [key, value] of params) {
      query[key] = value;
    }
    return query;
  }, []);

  const handleChange = useCallback((event: any) => {
    if (event?.target?.name) {
      const { name, value } = event.target;
      updateQuery({ name, value });
      const query = mountQuery();
      router.push({ pathname: router.pathname, query });
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        {hasInGroup([1, 2]) && (
          <Col xs={2} md={2} lg={2}>
            <Automakers
              defaultValue={defaultAutomaker}
              onChange={(e: any) => {
                handleChange(e);
                setAutomaker(() => e.target.value);
              }}
            />
          </Col>
        )}
        <Col xs={2} md={2} lg={2}>
          <Models
            defaultValue={defaultModel}
            automaker={automaker} 
            onChange={(e: any) => {
            handleChange(e)
            setModel(() => e.target.value)
          }} />
        </Col>
        <Col xs={2} md={2} lg={2} >
          <YearFab model={model} onChange={(e: any) => handleChange(e)} />
        </Col>

        {hasInGroup([1, 2]) && (
          <Col xs={2} md={2} lg={2}>
            <YearModel model={model} onChange={(e: any) => handleChange(e)} />
          </Col>
        )}

        {hasInGroup([1, 2]) && (
          <Col xs={2} md={2} lg={2}>
            <Motors model={model} onChange={(e: any) => handleChange(e)} />
          </Col>
        )}

        {hasInGroup([1, 2]) && (
          <Col xs={2} md={2} lg={2}>
            <Fuel model={model} onChange={(e: any) => handleChange(e)} />
          </Col>
        )}
        {hasInGroup([1, 2, 3, 4]) && (
          <Col xs={2} md={2} lg={2}>
            <Chassi
              model={model}
              onChange={(e: any) => handleChange(e)}
            />
          </Col>
        )}
        <Col xs={2} md={2} lg={2}>
          <Name onChange={(e: any) => handleChange(e)} />
        </Col>

        <Col xs={2} md={2} lg={2}>
          <Button
            onClick={() => clearFilter()}
            size="md"
            leftIcon={FaSearch}
          >
            Limpar filtro
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AutoExpandMenu;
