import { Group } from './Group';
import { Product } from './Product';
import { User } from './User';

export type Asset = {
  id: number;
  asset: string;
  mime: string;
  path: string;
  userId: number;
  groupId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  group?: Group;
  product?: Product;
};
