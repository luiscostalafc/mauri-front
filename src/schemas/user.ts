import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  username: Yup.string().required('Usuário é obrigatório'),
  activity: Yup.string().required('Atividade Profissional é obrigatório'),
  rg: Yup.string().required('RG é obrigatório'),
  cpf_cnpj: Yup.string().required('CPF ou CNPJ é obrigatório'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', {
    is: val => !!val.length,
    then: Yup.string()
      .min(6, 'No mínimo 6 dígitos')
      .required('Campo obrigatório'),
    otherwise: Yup.string(),
  }),
  password_confirmation: Yup.string()
    .when('old_password', {
      is: val => !!val.length,
      then: Yup.string().required('Campo obrigatório'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
});