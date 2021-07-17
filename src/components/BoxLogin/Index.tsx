/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Text } from '@chakra-ui/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Button, Card } from 'react-bootstrap';

interface BoxLoginInterface {
  route: string;
  title: string;
  subtitile: string;
  buttonLabel: string;
  color: string;
}

export default function BoxLogin({
  route,
  color,
  title,
  subtitile,
  buttonLabel,
}: BoxLoginInterface): ReactElement<any, any> | null {
  return (
    <Link href={route}>
      <Card>
        <Card.Header style={{background: color}} className="text-center">
          <Avatar size="lg" bg={color} style={{border: '1px solid'}}/>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Text fontSize="25px">{title}</Text>      
          </Card.Title>
          <Card.Text>  
            <Text fontSize="20px">{subtitile}</Text>
          </Card.Text>
          <Button block style={{background: color}}>
            {buttonLabel}
          </Button>      
        </Card.Body>
      </Card>
    </Link>
  );
}
