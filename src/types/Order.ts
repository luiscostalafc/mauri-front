import { Delivery } from './Delivery';
import { OrderStatus } from './OrderStatus';
import { User } from './User';

export interface Order {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  providerId: number;
  orderStatusId: number;
  deliveryId: number;
  user: User;
  provider: User;
  orderStatus: OrderStatus;
  delivery: Delivery;
}
