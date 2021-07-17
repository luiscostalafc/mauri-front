import { User } from './User';

export type Address = {
  id?: number;
  cep: string;
  zone: string;
  state: string;
  city: string;
  country: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  delivery: boolean;
  inactive: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
};
