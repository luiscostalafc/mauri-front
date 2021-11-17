import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome completo'),
  username: Yup.string().required('Nome de usuário obrigatório'),
  activity: Yup.string().optional(),
  rg: Yup.string().required('Preencha seu RG').max(14),
  cpf_cnpj: Yup.string().required('Preencha o CNPJ ou RG'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});