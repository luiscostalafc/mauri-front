import { Order } from './Order';

export type OrderStatus = {
  id: number;
  order_status: string;
  createdAt?: Date;
  updatedAt?: Date;
  order: Order;
};
