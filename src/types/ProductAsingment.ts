import { Product } from './Product';

export type ProductAsingment = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  product_asingment: string;
  productId: number;
  product: Product;
};
