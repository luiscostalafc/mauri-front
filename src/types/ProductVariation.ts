import { Product } from './Product';

export type ProductVariation = {
  id: number;
  productId: number;
  product_variation: string;
  createdAt?: Date;
  updatedAt?: Date;
  product: Product;
};
