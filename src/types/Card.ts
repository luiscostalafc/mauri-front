import { User } from './User';

export type Card = {
  id: number;
  card_number: string;
  brand: string;
  cvv: string;
  expiration_month: number;
  expiration_year: number;
  card_token: string;
  holder_name: string;
  holder_cpf: string;
  holder_birth_date: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  user?: User;
};
