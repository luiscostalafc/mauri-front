import { ToastMessage } from "@chakra-ui/react";

export const IN_APPROVAL_TOAST:Omit<ToastMessage, 'id'> = {
  type: 'success',
  title: 'Cadastro em análise',
  description:
  'Seu cadastro está em fase de análise, em breve você receberá um e-mail. Obrigado!',
}

export const LOGOUT_TOAST = {
  SUCCESS: {
    type: 'success',
    title: 'Logout',
    description:
    'Logout com sucesso!',
  },
  ERROR: {
    type: 'error',
    title: 'Logout',
    description:
    'Erro ao fazer o logou!',
  },
}
