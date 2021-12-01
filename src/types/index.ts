export * from './Address';
export * from './Asset';
export * from './Card';
export * from './Delivery';
export * from './Group';
export * from './Operation';
export * from './Order';
export * from './OrderDetail';
export * from './OrderStatus';
export * from './Permission';
export * from './Phone';
export * from './Product';
export * from './ProductAsingment';
export * from './StockOperation';
export * from './Stock';
export * from './Subgroup';
export * from './Synonym';
export * from './User';
export * from './UserGroup';

/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  group: Group;
  obs: string;
  image: string;
  quality: string;
  size: number;
  unity?: string;
}

interface Group {
  group: string;
}

interface ImageProduct {
  asset: object | string;
  mine: object | string;
  path: object | string;
}
