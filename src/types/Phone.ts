import { User } from '.';

export type Phone = {
  id: number;
  type: string;
  area_code: string;
  phone: string;
  whatsapp: boolean;
  inactive: boolean;
  obs: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
};
