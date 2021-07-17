import { User } from './User';

export type UserGroup = {
  id: number;
  group: string;
  is_visible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
};
