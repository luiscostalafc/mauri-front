/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import React from 'react';

type Bread = {
  href: string;
  label: string;
};

type BreadcrumbProps = {
  admin?: boolean;
  breads: Bread[];
};

const Bread: React.FC<BreadcrumbProps> = ({
  children,
  admin,
  breads,
  ...rest
}) => {
  const getCompleteURL = (URL: string): string =>
    admin ? `/admin/${URL}` : URL;
  return (
    <Breadcrumb spacing="8px" fontWeight="medium" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink href={admin ? '/admin/users' : '/'}>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {breads.length &&
        breads.map((bread, index) =>
          breads.length >= index ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={getCompleteURL(bread.href)}>
                {bread.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={index} isCurrentPage>
              <BreadcrumbLink href="#">{bread.label}</BreadcrumbLink>
            </BreadcrumbItem>
          ),
        )}
    </Breadcrumb>
  );
};

export default Bread;
