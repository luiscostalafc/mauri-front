import { Order } from './Order';

export type OrderDetail = {
  id: number;
  reference: string;
  payment_method: string;
  order_status: string;
  extra_amount: string;
  intallment_quantity: number;
  intallment_value: number;
  orderId: number;
  createdAt?: Date;
  updatedAt?: Date;
  order: Order;
};
