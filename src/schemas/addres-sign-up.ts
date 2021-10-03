import * as Yup from 'yup';

export const addresSignUpSchema = (id: string) => Yup.object().shape({
  user_id: Yup.string().default(id),
  cep: Yup.string().required('Preencha o CEP'),
  state: Yup.string().required('Preencha o UF'),
  city: Yup.string().required('Preencha a cidade'),
  district: Yup.string().required('Preencha o bairro'),
  street: Yup.string().required('Preencha o estado'),
  number: Yup.string().required('Preencha o número ou deixe como s/n'),
  complement: Yup.string(),
});