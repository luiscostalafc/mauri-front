import { Product } from './Product';

export type Synonym = {
  id: number;
  synonym: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
  product: Product;
};
