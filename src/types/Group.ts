import { Product } from './Product';
import { Subgroup } from './Subgroup';

export type Group = {
  id: number;
  group: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  subgroup: Subgroup;
};
