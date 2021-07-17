import { User } from './User';

export type Permission = {
  id: number;
  permission: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
};
