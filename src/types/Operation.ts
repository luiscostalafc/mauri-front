import { Product } from './Product';
import { StockOperation } from './StockOperation';

export type Operation = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  operation: string;
  stockOperation: StockOperation;
  product: Product;
};
