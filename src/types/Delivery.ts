import { Order } from './Order';

export type Delivery = {
  id: number;
  delivery: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
};
