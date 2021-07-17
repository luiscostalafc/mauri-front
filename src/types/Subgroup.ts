import { Group } from './Group';
import { Product } from './Product';

export type Subgroup = {
  id: number;
  subgroup: string;
  createdAt?: Date;
  updatedAt?: Date;
  product: Product;
  group: Group;
};
