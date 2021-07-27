import * as Yup from 'yup';

export const phoneSignUpSchema = (id: string) => Yup.object().shape({
  type: Yup.string().required('Tipo do telefone deve ser selecionado'),
  phone: Yup.string().required('Preencha o telefone com o DDD'),
  whatsapp: Yup.boolean().default(true),
  obs: Yup.string().optional(),
  user_id: Yup.string().default(id),
});