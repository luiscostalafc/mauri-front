import { ToastMessage } from '@chakra-ui/react';

export const IN_APPROVAL_TOAST: Omit<ToastMessage, 'id'> = {
  type: 'success',
  title: 'Cadastro em análise',
  description:
    'Seu cadastro está em fase de análise, em breve você receberá um e-mail. Obrigado!',
};

export const LOGOUT_TOAST = {
  SUCCESS: {
    type: 'success',
    title: 'Logout',
    description: 'Logout com sucesso!',
  },
  ERROR: {
    type: 'error',
    title: 'Logout',
    description: 'Erro ao fazer o logout!',
  },
};

export const SIGN_IN_TOAST = {
  type: 'success',
  title: 'Dados de usuário preenchidos com sucesso!',
  description: 'Você agora preencherá os dados telefônicos',
};

export const NOT_IN_STOCK = {
  type: 'error',
  title: 'Fora de Estoque!',
  description: 'Quantidade solicitada fora de estoque',
};

export const ADD_PRODUCT_ERROR = {
  type: 'error',
  title: 'Erro na adição de produto',
  description: 'Favor verificar os dados ou tentar mais tarde',
};

export const REMOVE_PRODUCT_ERROR = {
  type: 'error',
  title: 'Erro na remoção de produto',
  description: 'Favor verificar os dados ou tentar mais tarde',
};

export const UPDATE_QUANTITY_PRODUCT_ERROR = {
  type: 'error',
  title: 'Erro na alteração de quantidade do produto',
  description: 'Favor verificar os dados ou tentar mais tarde',
};

export const SIGN_IN_PHONE_TOAST = {
  SUCCESS: {
    type: 'success',
    title: 'Cadastro dos dados telefônicos realizado com sucesso!',
    description: 'Agora falta pouco... Preencha seu dados de endereço',
  },
  ERROR: {
    type: 'info',
    title: 'Erro no cadastro',
    description:
      'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.',
  },
};

export const SIGN_IN_ADDRESS_TOAST = {
  SUCCESS: {
    type: 'success',
    title: 'Cadastro do realizado com sucesso!',
    description: 'Aguarde a autorização de acesso',
  },
  ERROR: {
    type: 'info',
    title: 'Erro no cadastro',
    description:
      'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.',
  },
};

export const PROFILE_TOAST = {
  SUCCESS: {
    type: 'success',
    title: 'Perfil atualizado!',
    description: 'Suas informações do perfil foram atualizadas com sucesso!',
  },
  ERROR: {
    type: 'error',
    title: 'Erro na atualização',
    description: 'Ocorreu um error ao atualizar o perfil, tente novamente.',
  },
};
