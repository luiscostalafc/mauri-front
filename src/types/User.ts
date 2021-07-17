import { Address } from './Address';
import { Card } from './Card';
import { Order } from './Order';
import { Permission } from './Permission';
import { Phone } from './Phone';
import { UserGroup } from './UserGroup';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  activity: string;
  complete_name: string;
  email: string;
  rg: string;
  cpf_cnpj: string;
  nick: string;
  is_provider: boolean;
  inactive: boolean;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;

  address: Address;
  card: Card;
  permission: Permission;
  userGroup: UserGroup;
  phone: Phone;
  order: Order;
};
