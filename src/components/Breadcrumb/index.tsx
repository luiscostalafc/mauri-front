import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/core';
import React, { CSSProperties } from 'react';

type Bread = {
  href: string;
  label: string;
};

type BreadcrumbProps = {
  admin?: boolean;
  breads: Bread[];
  style?: CSSProperties;
};

const Bread: React.FC<BreadcrumbProps> = ({ admin, breads, style }) => {
  const getCompleteURL = (URL: string): string =>
    admin ? `/admin/${URL}` : URL;
  return (
    <Breadcrumb spacing="8px" fontWeight="medium" fontSize="sm" style={style}>
      <BreadcrumbItem>
        <BreadcrumbLink
          href={admin ? '/admin/users' : '/'}
          style={{ height: 20 }}
        >
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
