import { Operation } from './Operation';
import { Product } from './Product';

export type StockOperation = {
  id: number;
  quantity: number;
  unit_value: number;
  comment: string;
  operationId: number;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
  operation: Operation;
  product: Product;
};
